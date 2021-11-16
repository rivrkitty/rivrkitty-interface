import BigNumber from "bignumber.js";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { RequestState } from "../../common/model/reducer";

export type Token = {
  symbol: string;
  decimals: number;
  address: string;
  balance: number;
  allowance: {
    [address: string]: number;
  };
};

export type PoolInfo = {
  allocPoints: BigNumber;
  userBalance: BigNumber;
  pendingReward: BigNumber;
  addPendingReward: BigNumber;
};

export type TokensMap = { [token: string]: Token };

export type PoolInfoMap = {
  [tokenAddress: string]: {
    [poolId: number]: PoolInfo;
    totalAllocPoints: BigNumber;
    rewardPerWeek: BigNumber;
  };
};

export type FarmsState = {
  farms: { [networkId: string]: FarmType[] };
  requestState: RequestState;
  tokens: TokensMap;
  poolInfo: PoolInfoMap;
  fetchBalancesRequestState: RequestState;
  fetchBalancesDone: boolean;
  fetchApprovalPending: {
    [address: string]: boolean;
  };
  fetchApprovalDone: boolean;
  fetchDepositPending: {
    [address: string]: boolean;
  };
  fetchWithdrawPending: {
    [address: string]: boolean;
  };
  fetchPoolInfoPending: boolean;
  fetchHarvestPending: {
    [address: string]: boolean;
  };
};
