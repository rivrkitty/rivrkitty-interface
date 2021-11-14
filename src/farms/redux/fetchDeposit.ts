import { deposit } from "./../../web3/deposit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { FarmsState } from "../model/reducer";

type BaseFetchDepositProps = {
  amount: string;
  contractAddress: string;
  pid: number;
  tokenAddress: string;
};

interface FetchDepositProps extends BaseFetchDepositProps {
  address: string | null;
  web3: Web3 | null;
}

export const fetchDeposit = createAsync<FetchDepositProps, void, Error>(
  "FETCH_DEPOSIT",
  async ({ address, web3, ...other }, dispatch, _1) => {
    if (!web3 || !address) {
      return;
    }
    await deposit({
      web3,
      address,
      dispatch,
      ...other,
    });
  }
);

export function useFetchDeposit() {
  const dispatch = useDispatch();

  const { fetchDepositPending } = useSelector((state: Store) => ({
    fetchDepositPending: state.farms.fetchDepositPending,
  }));

  const { web3, address } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
  }));

  const boundAction = useCallback(
    (data: BaseFetchDepositProps) => {
      return dispatch(
        thunkToAction(fetchDeposit as any)({ web3, address, ...data })
      );
    },
    [dispatch, web3, address]
  );

  return {
    fetchDeposit: boundAction,
    fetchDepositPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchDeposit.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchDepositPending: {
        ...state.fetchDepositPending,
        [tokenAddress]: true,
      },
    }))
    .cases(
      [fetchDeposit.async.failed, fetchDeposit.async.done],
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchDepositPending: {
          ...state.fetchDepositPending,
          [tokenAddress]: false,
        },
      })
    );
