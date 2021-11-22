import BigNumber from "bignumber.js";
import { shallowEqual, useSelector } from "react-redux";
import { byDecimals } from "../../utils/bignumber";
import { Store } from "../../utils/rootReducer";
import { getPoolInfo } from "./common";

export { useFarms } from "./fetchFarms";

export function useTVL() {
  const { poolInfo, prices, tokens, farms, networkId } = useSelector(
    (state: Store) => ({
      prices: state.farms.prices,
      poolInfo: state.farms.poolInfo,
      tokens: state.farms.tokens,
      farms: state.farms.farms,
      networkId: state.common.networkId,
    }),
    shallowEqual
  );

  const infoFarmTVL = (
    chefAddress: string,
    tokenAddress: string,
    pid: number
  ) => {
    const info = getPoolInfo(poolInfo, chefAddress, pid);
    const lpPrice = new BigNumber(prices[tokenAddress] || 0);
    return byDecimals(info?.totalLp || 0, tokens[tokenAddress].decimals).times(
      lpPrice
    );
  };

  const infoTotalTVL = () => {
    if (!networkId) {
      return new BigNumber(0);
    }
    const tvls = (farms[networkId] || []).map((f) =>
      infoFarmTVL(f.chefAddress, f.tokenAddress, f.poolId)
    );
    return tvls.reduce((prev, cur) => prev.plus(cur), new BigNumber(0));
  };

  return {
    infoTotalTVL,
    infoFarmTVL,
  };
}
