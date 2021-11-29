import React from "react";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFarms } from "../redux/fetchFarms";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import { useFetchPrices } from "../redux/fetchPrices";
import { useFetchTvl } from "../redux/fetchTvl";

const FETCH_FARMS_INTERVAL_MS = 60 * 1000;
const FETCH_POOL_INFO_INTERVAL_MS = 15 * 1000;
const FETCH_PRICES_INTERVAL_MS = 40 * 1000;

export default function Fetcher() {
  const { farms, requestState, fetchFarms } = useFarms();
  const { tokens, fetchBalances, fetchBalancesRequestState } =
    useFetchBalances();
  const { fetchPoolInfo, fetchPoolInfoPending } = useFetchPoolInfo();
  const { fetchPrices, fetchPricesPending } = useFetchPrices();
  const { fetchTvl, fetchTvlPending } = useFetchTvl();

  React.useEffect(() => {
    const fetch = () => {
      if (!requestState.ongoing) {
        fetchFarms();
      }
      if (!fetchTvlPending) {
        fetchTvl();
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_FARMS_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFarms, fetchTvl]);

  const farmsExist = farms && farms.length > 0;
  React.useEffect(() => {
    const fetch = () => {
      if (!fetchBalancesRequestState.ongoing && farmsExist) {
        fetchBalances({ tokens });
      }
      if (!fetchPoolInfoPending && farmsExist) {
        fetchPoolInfo({ farms: farms });
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_POOL_INFO_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBalances, fetchPoolInfo, farmsExist]);

  React.useEffect(() => {
    const fetch = () => {
      if (!fetchPricesPending) {
        fetchPrices();
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_PRICES_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPrices]);
  return null;
}
