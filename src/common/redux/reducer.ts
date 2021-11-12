import { builderHandler as connectHandler } from "./connectWallet";
import { builderHandler as disconnectHandler } from "./disconnectWallet";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { CommonState } from "../model/reducer";

const networkId = process.env.REACT_APP_NETWORK_ID;

const initialState: CommonState = {
  address: null,
  web3: null,
  connected: false,
  networkId: networkId ? parseInt(networkId) : 1285,
  notifications: [],
};

export default reducerWithInitialState(initialState)
  .withHandling(connectHandler)
  .withHandling(disconnectHandler);
