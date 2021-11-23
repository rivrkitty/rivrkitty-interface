import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { FarmsState, FarmType, PoolInfo, PoolInfoMap } from "../model/reducer";
import BigNumber from "bignumber.js";
import { byDecimals } from "../../utils/bignumber";
import {
  AbiItem,
  CallContext,
  ContractCallContext,
  ContractCallResults,
} from "ethereum-multicall/dist/esm/models";
import { addRewardCalcABI, farmABI, otherChefAbi } from "../../web3/abi";
import {
  getNetworkAdditionalRewardCalc,
  getNetworkMulticall,
} from "../../web3/getNetworkData";
import { Multicall } from "ethereum-multicall";
import getBlockTime from "../../utils/getBlockTime";
import { getPoolInfo } from "./common";

const WEEK = 60 * 60 * 24 * 7;

type BaseFetchPoolInfoProps = {
  farms: FarmType[];
  pid?: number;
  chefAddress?: string;
};

interface FetchPoolInfoProps extends BaseFetchPoolInfoProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const fetchPoolInfo = createAsync<
  FetchPoolInfoProps,
  PoolInfoMap,
  Error
>(
  "FETCH_POOL_INFO",
  async ({ address, web3, networkId, farms, pid, chefAddress }, _1, _2) => {
    if (!web3 || !address || !networkId) {
      return {};
    }
    if (farms.length === 0) {
      return {};
    }

    const blockTime = await getBlockTime(web3);

    const additionalRewardCalcAddress =
      getNetworkAdditionalRewardCalc(networkId);
    const multicallAddress = getNetworkMulticall(networkId);
    const multicall = new Multicall({
      web3Instance: web3,
      tryAggregate: true,
      multicallCustomContractAddress: multicallAddress,
    });

    const poolInfo: PoolInfoMap = {};

    const contractCallContext: ContractCallContext<{ farm: FarmType }>[] = [];

    const basePoolInfoValues = {
      allocPoints: new BigNumber(0),
      totalLp: new BigNumber(0),
      userBalance: new BigNumber(0),
      pendingReward: new BigNumber(0),
      addPendingReward: new BigNumber(0),
    };

    const baseChefPoolInfoValues = {
      totalAllocPoints: new BigNumber(0),
      rewardPerWeek: new BigNumber(0),
    };

    const chefCalls: CallContext[] = [
      {
        reference: "totalAllocPoint",
        methodName: "totalAllocPoint",
        methodParameters: [],
      },
      {
        reference: "rewardsPerBlock",
        methodName: "pawsPerBlock",
        methodParameters: [],
      },
    ];

    farms.forEach((farm) => {
      if (pid && farm.poolId !== pid) {
        return;
      }
      chefCalls.push({
        reference: `userInfo_${farm.poolId}`,
        methodName: "userInfo",
        methodParameters: [farm.poolId, address],
      });
      chefCalls.push({
        reference: `poolInfo_${farm.poolId}`,
        methodName: "poolInfo",
        methodParameters: [farm.poolId],
      });
      chefCalls.push({
        reference: `pendingReward_${farm.poolId}`,
        methodName: "pendingReward",
        methodParameters: [farm.poolId, address],
      });

      if (
        !chefAddress &&
        farm.addRewardChefAddress &&
        farm.addRewardChefPid &&
        farm.addRewardChefPerBlockName
      ) {
        const addChefCalls: CallContext[] = [];
        addChefCalls.push({
          reference: "addPoolInfo",
          methodName: "poolInfo",
          methodParameters: [farm.addRewardChefPid],
        });
        addChefCalls.push({
          reference: "addTotalAllocPoint",
          methodName: "totalAllocPoint",
          methodParameters: [],
        });
        addChefCalls.push({
          reference: "rewardsPerBlock",
          methodName: farm.addRewardChefPerBlockName,
          methodParameters: [],
        });
        contractCallContext.push({
          reference: farm.addRewardChefAddress,
          contractAddress: farm.addRewardChefAddress,
          abi: otherChefAbi(farm.addRewardChefPerBlockName),
          calls: addChefCalls,
          context: {
            farm,
          },
        });
        contractCallContext.push({
          reference: `addRewardCalc_${farm.poolId}`,
          contractAddress: additionalRewardCalcAddress,
          abi: addRewardCalcABI as AbiItem[],
          calls: [
            {
              reference: "pendingReward",
              methodName: "pendingRewards",
              methodParameters: [farm.chefAddress, farm.poolId, address],
            },
          ],
          context: {
            farm,
          },
        });

        poolInfo[farm.addRewardChefAddress] = {
          ...baseChefPoolInfoValues,
        };
      }
    });

    poolInfo[farms[0].chefAddress] = {
      ...baseChefPoolInfoValues,
    };

    contractCallContext.push({
      reference: farms[0].chefAddress,
      contractAddress: farms[0].chefAddress,
      abi: farmABI as AbiItem[],
      calls: chefCalls,
    });

    const results: ContractCallResults = await multicall.call(
      contractCallContext
    );

    Object.entries(results.results).forEach(([chefAddress, result]) => {
      const farm: FarmType | undefined =
        result.originalContractCallContext.context?.farm;
      if (chefAddress.startsWith("addRewardCalc_")) {
        if (!farm) {
          return;
        }
        result.callsReturnContext.forEach((c) => {
          if (!c.success) {
            console.error("Failed to get pool info data", c);
            return;
          }
          poolInfo[farm.chefAddress] = {
            ...poolInfo[farm.chefAddress],
            [farm.poolId]: {
              ...(poolInfo[farm.chefAddress][farm.poolId] ||
                basePoolInfoValues),
              addPendingReward: new BigNumber(c.returnValues[0].hex),
            },
          };
        });
      } else {
        result.callsReturnContext.forEach((c) => {
          if (!c.success) {
            console.error("Failed to get pool info data", c);
            return;
          }
          if (c.reference.startsWith("userInfo_")) {
            const poolId = parseInt(c.reference.split("_")[1]);
            poolInfo[chefAddress] = {
              ...poolInfo[chefAddress],
              [poolId]: {
                ...(poolInfo[chefAddress][poolId] || basePoolInfoValues),
                userBalance: new BigNumber(c.returnValues[0].hex),
              },
            };
          } else if (c.reference.startsWith("poolInfo_")) {
            const poolId = parseInt(c.reference.split("_")[1]);
            poolInfo[chefAddress] = {
              ...poolInfo[chefAddress],
              [poolId]: {
                ...(poolInfo[chefAddress][poolId] || basePoolInfoValues),
                allocPoints: new BigNumber(c.returnValues[1].hex),
                totalLp: new BigNumber(c.returnValues[5].hex),
              },
            };
          } else if (c.reference.startsWith("pendingReward_")) {
            const poolId = parseInt(c.reference.split("_")[1]);
            poolInfo[chefAddress] = {
              ...poolInfo[chefAddress],
              [poolId]: {
                ...(poolInfo[chefAddress][poolId] || basePoolInfoValues),
                pendingReward: new BigNumber(c.returnValues[0].hex),
              },
            };
          } else if (c.reference === "totalAllocPoint") {
            poolInfo[chefAddress] = {
              ...poolInfo[chefAddress],
              totalAllocPoints: new BigNumber(c.returnValues[0].hex),
            };
          } else if (c.reference === "rewardsPerBlock") {
            const perBlockType = farm?.addRewardChefPerBlockType || "block";
            let rewardPerWeek = new BigNumber(c.returnValues[0].hex);
            if (perBlockType === "block") {
              rewardPerWeek = rewardPerWeek.times(WEEK).div(blockTime);
            } else {
              rewardPerWeek = rewardPerWeek.times(WEEK);
            }
            poolInfo[chefAddress] = {
              ...poolInfo[chefAddress],
              rewardPerWeek,
            };
          } else if (
            ["addPoolInfo", "addTotalAllocPoint"].includes(c.reference)
          ) {
            const addChefAddress = farm?.addRewardChefAddress;
            const addChefPid = farm?.addRewardChefPid;
            if (addChefAddress && addChefPid) {
              if (c.reference === "addPoolInfo") {
                poolInfo[addChefAddress] = {
                  ...poolInfo[addChefAddress],
                  [addChefPid]: {
                    ...(poolInfo[addChefAddress][addChefPid] ||
                      basePoolInfoValues),
                    allocPoints: new BigNumber(c.returnValues[1].hex),
                  },
                };
              } else if (c.reference === "addTotalAllocPoint") {
                poolInfo[addChefAddress] = {
                  ...poolInfo[addChefAddress],
                  totalAllocPoints: new BigNumber(c.returnValues[0].hex),
                };
              }
            }
          }
        });
      }
    });

    return poolInfo;
  }
);

export function useFetchPoolInfo() {
  const dispatch = useDispatch();

  const { fetchPoolInfoPending, poolInfo, tokens, networkId } = useSelector(
    (state: Store) => ({
      fetchPoolInfoPending: state.farms.fetchPoolInfoPending,
      poolInfo: state.farms.poolInfo,
      tokens: state.farms.tokens,
      networkId: state.common.networkId,
    })
  );

  const { web3, address } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
  }));

  const boundAction = useCallback(
    (data: BaseFetchPoolInfoProps) => {
      return dispatch(fetchPoolInfo({ web3, address, networkId, ...data }));
    },
    [dispatch, web3, address, networkId]
  );

  const infoTokenBalance = (
    chefAddress: string,
    tokenAddress: string,
    pid: number
  ) => {
    const info = getPoolInfo(poolInfo, chefAddress, pid);
    return byDecimals(info?.userBalance || 0, tokens[tokenAddress].decimals);
  };

  const hasTokenBalance = (chefAddress: string, pid: number) => {
    const info = getPoolInfo(poolInfo, chefAddress, pid);
    if (!info) {
      return null;
    }
    return (
      !info.userBalance.isZero() ||
      !info.pendingReward.isZero() ||
      !info.addPendingReward.isZero()
    );
  };

  const infoPendingReward = useCallback(
    (chefAddress: string, tokenAddress: string, pid: number) => {
      const info = getPoolInfo(poolInfo, chefAddress, pid);
      return byDecimals(
        info?.pendingReward || 0,
        tokens[tokenAddress].decimals
      );
    },
    [poolInfo, tokens]
  );

  const infoAddPendingReward = (
    chefAddress: string,
    tokenAddress: string,
    pid: number
  ) => {
    const info = getPoolInfo(poolInfo, chefAddress, pid);
    return byDecimals(
      info?.addPendingReward || 0,
      tokens[tokenAddress].decimals
    );
  };

  const infoPoolRate = (
    chefAddress: string,
    tokenAddress: string,
    pid: number
  ) => {
    const chefPoolInfo = poolInfo[chefAddress];
    if (!chefPoolInfo) {
      return null;
    }
    const info = chefPoolInfo[pid];
    if (!info) {
      return null;
    }
    const rewardPerWeek = chefPoolInfo.rewardPerWeek;
    const totalAllocPoints = chefPoolInfo["totalAllocPoints"];
    const poolAllocPoints = info["allocPoints"];

    return byDecimals(
      rewardPerWeek.times(poolAllocPoints).div(totalAllocPoints),
      tokens[tokenAddress]?.decimals || 18
    );
  };

  return {
    poolInfo,
    infoTokenBalance,
    infoPendingReward,
    infoAddPendingReward,
    infoPoolRate,
    hasTokenBalance,
    fetchPoolInfo: boundAction,
    fetchPoolInfoPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchPoolInfo.async.started, (state) => ({
      ...state,
      fetchPoolInfoPending: true,
    }))
    .case(fetchPoolInfo.async.failed, (state) => ({
      ...state,
      fetchPoolInfoPending: false,
    }))
    .case(fetchPoolInfo.async.done, (state, { result }) => ({
      ...state,
      fetchPoolInfoPending: false,
      poolInfo: result,
    }));
