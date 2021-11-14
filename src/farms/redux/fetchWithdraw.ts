import { thunkToAction } from "typescript-fsa-redux-thunk";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { useDispatch, useSelector } from "react-redux";
import { withdraw } from "./../../web3/withdraw";
import { useCallback } from "react";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { FarmsState } from "../model/reducer";

type BaseFetchWithdrawProps = {
  amount: string;
  contractAddress: string;
  pid: number;
  tokenAddress: string;
};

interface FetchWithdrawProps extends BaseFetchWithdrawProps {
  address: string | null;
  web3: Web3 | null;
}

export const fetchWithdraw = createAsync<FetchWithdrawProps, void, Error>(
  "FETCH_WITHDRAW",
  async ({ address, web3, ...other }, dispatch, _1) => {
    if (!web3 || !address) {
      return;
    }
    await withdraw({
      web3,
      address,
      dispatch,
      ...other,
    });
  }
);

export function useFetchWithdraw() {
  const dispatch = useDispatch();

  const { fetchWithdrawPending } = useSelector((state: Store) => ({
    fetchWithdrawPending: state.farms.fetchWithdrawPending,
  }));

  const { web3, address } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
  }));

  const boundWithdraw = useCallback(
    (data: BaseFetchWithdrawProps) =>
      dispatch(thunkToAction(fetchWithdraw as any)({ web3, address, ...data })),
    [dispatch, address, web3]
  );

  return {
    fetchWithdraw: boundWithdraw,
    fetchWithdrawPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchWithdraw.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchWithdrawPending: {
        ...state.fetchWithdrawPending,
        [tokenAddress]: true,
      },
    }))
    .cases(
      [fetchWithdraw.async.failed, fetchWithdraw.async.done],
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchWithdrawPending: {
          ...state.fetchWithdrawPending,
          [tokenAddress]: false,
        },
      })
    );
