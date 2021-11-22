import { builderHandler as connectHandler } from "./connectWallet";
import { builderHandler as disconnectHandler } from "./disconnectWallet";
import { builderHandler as fetchPricesHandler } from "./fetchTokenPrice";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { CommonState } from "../model/reducer";

const initialState: CommonState = {
  address: null,
  web3: null,
  connected: false,
  networkId: null,
  notifications: [],
  prices: {},
  fetchPricesPending: {},
};

export default reducerWithInitialState(initialState)
  .withHandling(connectHandler)
  .withHandling(disconnectHandler)
  .withHandling(fetchPricesHandler);
