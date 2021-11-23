import React from "react";
import { useFetchTokenPrice } from "../redux/fetchTokenPrice";

const FETCH_PRICE_INTERVAL_MS = 15 * 1000;

export default function Fetcher() {
  const { fetchPricesPending, fetchTokenPrice } = useFetchTokenPrice();

  React.useEffect(() => {
    const fetch = () => {
      if (!fetchPricesPending["rivrkitty"]) {
        fetchTokenPrice("rivrkitty");
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_PRICE_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTokenPrice]);

  return null;
}
