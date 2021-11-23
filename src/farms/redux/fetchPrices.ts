import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { API } from "../../utils/api";
import { FarmsState, PricesMap } from "../model/reducer";

export const fetchPrices = createAsync<
  { networkId: number | null },
  PricesMap,
  Error
>("FETCH_PRICES", async ({ networkId }, _1, _2) => {
  if (!networkId) {
    return {};
  }
  const result = await API.get<PricesMap>(`/prices/${networkId}`);
  return result.data;
});

export function useFetchPrices() {
  const dispatch = useDispatch();
  const { prices, fetchPricesPending, networkId } = useSelector(
    (state: Store) => ({
      prices: state.farms.prices,
      fetchPricesPending: state.farms.fetchPricesPending,
      networkId: state.common.networkId,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () => dispatch(fetchPrices({ networkId })),
    [dispatch, networkId]
  );

  return {
    prices,
    fetchPricesPending,
    fetchPrices: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchPrices.async.started, (state) => ({
      ...state,
      fetchPricesPending: true,
    }))
    .case(fetchPrices.async.failed, (state) => ({
      ...state,
      fetchPricesPending: false,
    }))
    .case(fetchPrices.async.done, (state, { result }) => ({
      ...state,
      fetchPricesPending: false,
      prices: result,
    }));
