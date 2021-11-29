import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { FarmsState, TvlInfo } from "../model/reducer";
import { API } from "../../utils/api";

export const fetchTvl = createAsync<
  { networkId: number | null },
  TvlInfo,
  Error
>("FETCH_TVL", async ({ networkId }) => {
  const result = await API.get<TvlInfo>(`/tvl/${networkId}`);
  return result.data;
});

export function useFetchTvl() {
  const dispatch = useDispatch();
  const { totalTvl, tvl, fetchTvlPending, networkId } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      totalTvl: state.farms.tvl?.total,
      tvl: state.farms.tvl,
      fetchTvlPending: state.farms.fetchTvlPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () => dispatch(fetchTvl({ networkId })),
    [dispatch, networkId]
  );

  return {
    totalTvl: totalTvl === "0" ? null : totalTvl,
    tvl,
    fetchTvlPending,
    fetchTvl: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchTvl.async.started, (state) => ({
      ...state,
      fetchTvlPending: true,
    }))
    .case(fetchTvl.async.failed, (state) => ({
      ...state,
      fetchTvlPending: false,
    }))
    .case(fetchTvl.async.done, (state, { result }) => ({
      ...state,
      tvl: result,
      fetchTvlPending: false,
    }));
