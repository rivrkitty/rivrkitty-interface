import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as fetchFarmsHandler } from "./fetchFarms";
import { builderHandler as fetchBalancesHandler } from "./fetchBalances";
import { builderHandler as fetchApprovalHandler } from "./fetchApproval";
import { builderHandler as fetchDepositHandler } from "./fetchDeposit";
import { builderHandler as fetchWithdrawHandler } from "./fetchWithdraw";
import { builderHandler as fetchUserInfoHandler } from "./fetchUserInfo";
import { FarmsState } from "../model/reducer";
import { createRequestState } from "../../common";

const initialState: FarmsState = {
  farms: {},
  requestState: createRequestState(),
  tokens: {},
  userInfo: {},
  fetchBalancesRequestState: createRequestState(),
  fetchBalancesDone: false,
  fetchApprovalPending: {},
  fetchApprovalDone: false,
  fetchDepositPending: {},
  fetchWithdrawPending: {},
  fetchUserInfoPending: {},
};

export default reducerWithInitialState(initialState)
  .withHandling(fetchFarmsHandler)
  .withHandling(fetchBalancesHandler)
  .withHandling(fetchApprovalHandler)
  .withHandling(fetchDepositHandler)
  .withHandling(fetchWithdrawHandler)
  .withHandling(fetchUserInfoHandler);
