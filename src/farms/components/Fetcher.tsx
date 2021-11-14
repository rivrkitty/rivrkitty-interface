import React from "react";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFarms } from "../redux/fetchFarms";

const FETCH_INTERVAL_MS = 15 * 1000;

export default function Fetcher() {
  const { requestState, fetchFarms } = useFarms();
  const { tokens, fetchBalances, fetchBalancesRequestState } =
    useFetchBalances();

  React.useEffect(() => {
    const fetch = () => {
      if (!fetchBalancesRequestState.ongoing) {
        fetchBalances({ tokens });
      }
      if (!requestState.ongoing) {
        fetchFarms();
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBalances, fetchFarms]);
  return null;
}
