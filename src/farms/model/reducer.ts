import { FarmType } from "../../../rivrkitty-common/farms/models";
import { RequestState } from "../../common/model/reducer";

export type Token = {
  symbol: string;
  decimals: number;
  address: string;
  balance: number;
  allowance: {
    [address: string]: number;
  };
};

export type TokensMap = { [token: string]: Token };

export type FarmsState = {
  farms: { [networkId: string]: FarmType[] };
  requestState: RequestState;
  tokens: TokensMap;
  fetchBalancesRequestState: RequestState;
  fetchBalancesDone: boolean;
  fetchApprovalPending: {
    [address: string]: boolean;
  };
  fetchApprovalDone: boolean;
  fetchDepositPending: {
    [address: string]: boolean;
  };
};
