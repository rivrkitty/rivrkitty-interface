import { ReducerBuilder } from "typescript-fsa-reducers";
import { useCallback } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { CommonState } from "../model/reducer";

export const disconnectWallet = createAsync<
  { web3Modal: Web3Modal; web3: Web3 },
  void,
  Error
>("DISCONNECT_WALLET", async ({ web3Modal, web3 }, _1, _2) => {
  const provider = web3 && (web3.currentProvider as { close?: () => void });
  if (provider && provider.close) {
    await provider.close();
  }
  await web3Modal.clearCachedProvider();
});

export function useDisconnectWallet() {
  const dispatch = useDispatch();
  const disconnectWalletPending = useSelector<Store>(
    (state) => state.common.disconnectWalletPending,
    shallowEqual
  );
  const boundAction = useCallback(
    (web3: Web3, web3Modal: Web3Modal) =>
      dispatch(disconnectWallet({ web3, web3Modal })),
    [dispatch]
  );

  return { disconnectWalletPending, disconnectWallet: boundAction };
}

export const builderHandler = (
  builder: ReducerBuilder<CommonState>
): ReducerBuilder<CommonState> =>
  builder
    .case(disconnectWallet.async.started, (state) => ({
      ...state,
      disconnectWalletPending: true,
    }))
    .cases(
      [disconnectWallet.async.done, disconnectWallet.async.failed],
      (state) => ({
        ...state,
        web3: null,
        address: null,
        connected: false,
        disconnectWalletPending: false,
      })
    );
