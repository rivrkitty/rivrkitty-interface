import { TokensMap } from "./../model/reducer";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { deposit } from "../../web3/deposit";
import { FarmsState, FarmType } from "../model/reducer";
import BigNumber from "bignumber.js";

type BaseFetchHarvestProps = {
  contractAddress: string;
  pid: number;
  tokenAddress: string;
};

interface FetchHarvestProps extends BaseFetchHarvestProps {
  address: string | null;
  web3: Web3 | null;
}

export const fetchHarvest = createAsync<FetchHarvestProps, void, Error>(
  "FETCH_HARVEST",
  async ({ address, web3, ...other }, dispatch, _1) => {
    if (!web3 || !address) {
      return;
    }
    await deposit({
      web3,
      address,
      dispatch,
      amount: "0",
      ...other,
    });
  }
);

type BaseFetchHarvestAllProps = {
  farms: FarmType[] | null;
};

interface FetchHarvestAllProps extends BaseFetchHarvestAllProps {
  address: string | null;
  web3: Web3 | null;
  tokens: TokensMap;
}

export const fetchAllHarvest = createAsync<FetchHarvestAllProps, void, Error>(
  "FETCH_ALL_HARVEST",
  async ({ address, web3, farms, tokens }, dispatch, _1) => {
    if (!web3 || !address || !farms) {
      return;
    }
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i];
      const bal = tokens[farm.tokenAddress]?.balance || "0";
      if (new BigNumber(bal).isZero() === false) {
        await dispatch(
          fetchHarvest({
            address,
            web3,
            contractAddress: farm.chefAddress,
            pid: farm.poolId,
            tokenAddress: farm.tokenAddress,
          })
        );
      }
    }
  }
);

export function useFetchHarvest() {
  const dispatch = useDispatch();

  const { fetchHarvestPending, tokens, web3, address } = useSelector(
    (state: Store) => ({
      fetchHarvestPending: state.farms.fetchHarvestPending,
      tokens: state.farms.tokens,
      web3: state.common.web3,
      address: state.common.address,
    })
  );

  const boundAction = useCallback(
    (data: BaseFetchHarvestProps) =>
      dispatch(thunkToAction(fetchHarvest as any)({ ...data, web3, address })),
    [dispatch, web3, address]
  );
  const boundAction2 = useCallback(
    (data: BaseFetchHarvestAllProps) =>
      dispatch(fetchAllHarvest({ ...data, web3, address, tokens })),
    [dispatch, web3, address, tokens]
  );

  return {
    fetchHarvest: boundAction,
    fetchHarvestAll: boundAction2,
    fetchHarvestPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchHarvest.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchHarvestPending: {
        ...state.fetchHarvestPending,
        [tokenAddress]: true,
      },
    }))
    .cases(
      [fetchHarvest.async.failed, fetchHarvest.async.done],
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [tokenAddress]: false,
        },
      })
    );
