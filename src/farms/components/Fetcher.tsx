import React from "react";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFarms } from "../redux/fetchFarms";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";

const FETCH_FARMS_INTERVAL_MS = 60 * 1000;
const FETCH_POOL_INFO_INTERVAL_MS = 15 * 1000;

export default function Fetcher() {
  const { farms, requestState, fetchFarms } = useFarms();
  const { tokens, fetchBalances, fetchBalancesRequestState } =
    useFetchBalances();
  const { fetchPoolInfo, fetchPoolInfoPending } = useFetchPoolInfo();

  React.useEffect(() => {
    const fetch = () => {
      if (!requestState.ongoing) {
        fetchFarms();
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_FARMS_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFarms]);

  React.useEffect(() => {
    const fetch = () => {
      if (!fetchBalancesRequestState.ongoing) {
        fetchBalances({ tokens });
      }
      if (!fetchPoolInfoPending && farms && farms.length > 0) {
        fetchPoolInfo({ farms: farms });
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_POOL_INFO_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBalances, fetchPoolInfo]);
  return null;
}
