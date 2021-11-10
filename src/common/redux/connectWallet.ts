import { ReducerBuilder } from "typescript-fsa-reducers";
import { create, createAsync } from "../../utils/reduxCreators";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { disconnectWallet } from "./disconnectWallet";
import { Store } from "../../utils/rootReducer";
import { CommonState } from "../model/reducer";

export const accountChanged = create<{ address: string }>("ACCOUNT_CHANGED");
export const networkChanged = create<{ networkId: number }>("NETWORK_CHANGED");

export const connectWallet = createAsync<
  { web3Modal: Web3Modal },
  { web3: Web3; address: string; networkId: number },
  Error
>("CONNECT_WALLET", async ({ web3Modal }, dispatch, _) => {
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber as any,
      },
    ],
  });
  const subscribeProvider = (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => {
      dispatch(disconnectWallet({ web3, web3Modal }));
    });
    provider.on("disconnect", async () => {
      dispatch(disconnectWallet({ web3, web3Modal }));
    });
    provider.on("accountsChanged", async (accounts: string[]) => {
      if (accounts[0]) {
        dispatch(accountChanged({ address: accounts[0] }));
      } else {
        dispatch(disconnectWallet({ web3, web3Modal }));
      }
    });
    provider.on("chainChanged", async (chainId: number) => {
      const networkId = web3.utils.isHex(chainId)
        ? web3.utils.hexToNumber(chainId)
        : chainId;
      dispatch(networkChanged({ networkId }));
    });
  };
  subscribeProvider(provider);

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];
  let networkId = await web3.eth.getChainId();
  return { web3, address, networkId };
});

export function useConnectWallet() {
  const dispatch = useDispatch();
  const { web3, address, networkId, connected, connectWalletPending } =
    useSelector(
      (state: Store) => ({
        web3: state.common.web3,
        address: state.common.address,
        networkId: state.common.networkId,
        connected: state.common.connected,
        connectWalletPending: state.common.connectWalletPending,
      }),
      shallowEqual
    );
  const boundAction = useCallback(
    (web3Modal: Web3Modal) => dispatch(connectWallet({ web3Modal })),
    [dispatch]
  );

  return {
    web3,
    address,
    networkId,
    connected,
    connectWalletPending,
    connectWallet: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<CommonState>
): ReducerBuilder<CommonState> =>
  builder
    .case(connectWallet.async.started, (state) => ({
      ...state,
      connectWalletPending: true,
    }))
    .case(connectWallet.async.failed, (state) => ({
      ...state,
      connectWalletPending: false,
    }))
    .case(connectWallet.async.done, (state, { result }) => ({
      ...state,
      ...result,
      connected: true,
      connectWalletPending: false,
    }))
    .case(networkChanged, (state, { networkId }) => ({ ...state, networkId }))
    .case(accountChanged, (state, { address }) => ({ ...state, address }));
