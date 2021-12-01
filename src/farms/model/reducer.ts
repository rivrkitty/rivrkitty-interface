import BigNumber from "bignumber.js";
import { RequestState } from "../../common/model/reducer";

export type FarmType = {
  id: string;
  poolId: number;
  name: string;
  platform: string;
  platformUrl: string;
  chefAddress: string;
  addRewardChefAddress?: string;
  addRewardChefPid?: number;
  addRewardChefPerBlockName?: string;
  addRewardChefPerBlockType?: "seconds" | "block";
  tokenName: string;
  tokenAddress: string;
  tokenDecimals: number;
  tokenAssets: string[];
  tokenAssetAddresses: string[];
  buyTokenUrl: string;
  rewardTokens: string[];
  rewardTokensAddress: string[];
  rewardTokensDecimals: number[];
};

export type Token = {
  symbol: string;
  decimals: number;
  address: string;
  balance: string;
  allowance: {
    [address: string]: string;
  };
};

export type PoolInfo = {
  allocPoints: string;
  userBalance: string;
  pendingReward: string;
  addPendingReward: string;
  totalLp: string;
};

export type TokensMap = { [token: string]: Token };

export type PricesMap = { [token: string]: string };

export type PoolInfoMap = {
  [tokenAddress: string]: {
    [poolId: number]: PoolInfo;
    totalAllocPoints: string;
    rewardPerWeek: string;
  };
};

export type TvlInfo = { [tokenAddress: string]: string; total: string };

export type FarmsState = {
  farms: { [networkId: string]: FarmType[] };
  requestState: RequestState;
  tokens: TokensMap;
  poolInfo: PoolInfoMap;
  prices: PricesMap;
  tvl: TvlInfo;
  fetchBalancesRequestState: RequestState;
  fetchBalancesDone: boolean;
  fetchPricesPending: boolean;
  fetchApprovalPending: {
    [address: string]: boolean;
  };
  fetchApprovalDone: boolean;
  fetchDepositPending: {
    [address: string]: boolean;
  };
  fetchWithdrawPending: {
    [address: string]: boolean;
  };
  fetchPoolInfoPending: boolean;
  fetchHarvestPending: {
    [address: string]: boolean;
  };
  fetchTvlPending: boolean;
};
