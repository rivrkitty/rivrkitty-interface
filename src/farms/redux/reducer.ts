import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as fetchFarmsHandler } from "./fetchFarms";
import { builderHandler as fetchBalancesHandler } from "./fetchBalances";
import { builderHandler as fetchApprovalHandler } from "./fetchApproval";
import { builderHandler as fetchDepositHandler } from "./fetchDeposit";
import { builderHandler as fetchWithdrawHandler } from "./fetchWithdraw";
import { builderHandler as fetchUserInfoHandler } from "./fetchPoolInfo";
import { builderHandler as fetchHarvestHandler } from "./fetchHarvest";
import { builderHandler as fetchPricestHandler } from "./fetchPrices";
import { FarmsState } from "../model/reducer";
import { createRequestState } from "../../common";
import { networkChanged } from "../../common/redux/connectWallet";

const initialState: FarmsState = {
  farms: {},
  requestState: createRequestState(),
  tokens: {},
  poolInfo: {},
  prices: {},
  fetchBalancesRequestState: createRequestState(),
  fetchBalancesDone: false,
  fetchPricesPending: false,
  fetchApprovalPending: {},
  fetchApprovalDone: false,
  fetchDepositPending: {},
  fetchWithdrawPending: {},
  fetchPoolInfoPending: false,
  fetchHarvestPending: {},
};

export default reducerWithInitialState(initialState)
  .withHandling(fetchFarmsHandler)
  .withHandling(fetchBalancesHandler)
  .withHandling(fetchApprovalHandler)
  .withHandling(fetchDepositHandler)
  .withHandling(fetchWithdrawHandler)
  .withHandling(fetchUserInfoHandler)
  .withHandling(fetchHarvestHandler)
  .withHandling(fetchPricestHandler)
  .case(networkChanged, () => ({
    ...initialState,
  }));
