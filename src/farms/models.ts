export type FarmType = {
  id: string;
  poolId: number;
  name: string;
  platform: string;
  platformUrl: string;
  tokenName: string;
  tokenAddress: string;
  tokenDecimals: number;
  tokenAssets: string[];
  tokenAssetAddresses: string[];
  buyTokenUrl: string;
  rewardTokens: string[];
  rewardTokensAddress: string[];
};
