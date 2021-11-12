import { builderHandler as getFarmsHandler } from "./getFarms";
import { builderHandler as fetchBalancesHandler } from "./fetchBalances";
import { builderHandler as fetchApprovalHandler } from "./fetchApproval";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { FarmsState } from "../model/reducer";
import { createRequestState } from "../../common";

const initialState: FarmsState = {
  farms: {},
  requestState: createRequestState(),
  tokens: {},
  fetchBalancesRequestState: createRequestState(),
  fetchBalancesDone: false,
  fetchApprovalPending: {},
  fetchApprovalDone: false,
  fetchDepositPending: {},
};

export default reducerWithInitialState(initialState)
  .withHandling(getFarmsHandler)
  .withHandling(fetchBalancesHandler)
  .withHandling(fetchApprovalHandler);
