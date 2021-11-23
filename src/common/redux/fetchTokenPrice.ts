import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { CommonState } from "../model/reducer";
import { API } from "../../utils/api";

export const fetchTokenPrice = createAsync<
  { tokenId: string; networkId: number | null },
  number,
  Error
>("FETCH_TOKEN_PRICE", async ({ tokenId, networkId }, _1, _2) => {
  if (!networkId) {
    return 0;
  }
  const result = await API.get<{ [tokenId: string]: { usd: number } }>(
    `/prices/${networkId}/${tokenId}`
  );
  return result.data[tokenId].usd;
});

export function useFetchTokenPrice() {
  const dispatch = useDispatch();
  const { prices, fetchPricesPending, networkId } = useSelector(
    (state: Store) => ({
      prices: state.common.prices,
      fetchPricesPending: state.common.fetchPricesPending,
      networkId: state.common.networkId,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    (tokenId: string) => dispatch(fetchTokenPrice({ tokenId, networkId })),
    [dispatch, networkId]
  );

  return {
    prices,
    fetchPricesPending,
    fetchTokenPrice: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<CommonState>
): ReducerBuilder<CommonState> =>
  builder
    .case(fetchTokenPrice.async.started, (state, { tokenId }) => ({
      ...state,
      fetchPricesPending: {
        ...state.fetchPricesPending,
        [tokenId]: true,
      },
    }))
    .case(fetchTokenPrice.async.failed, (state, { params: { tokenId } }) => ({
      ...state,
      fetchPricesPending: {
        ...state.fetchPricesPending,
        [tokenId]: false,
      },
    }))
    .case(
      fetchTokenPrice.async.done,
      (state, { params: { tokenId }, result }) => ({
        ...state,
        fetchPricesPending: {
          ...state.fetchPricesPending,
          [tokenId]: false,
        },
        prices: {
          ...state.prices,
          [tokenId]: result,
        },
      })
    );
