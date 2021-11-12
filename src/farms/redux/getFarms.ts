import { ReducerBuilder } from "typescript-fsa-reducers";
import * as R from "ramda";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createAsync } from "../../utils/reduxCreators";
import { FarmsState } from "../model/reducer";
import { API } from "../../utils/api";
import { FarmType } from "./../../../rivrkitty-common/farms/models";
import { Store } from "./../../utils/rootReducer";

export const getFarms = createAsync<{ networkId: number }, FarmType[], Error>(
  "GET_FARMS",
  async ({ networkId }, _1, _2) => {
    const result = await API.get<FarmType[]>(`/farms/${networkId}`);
    return result.data;
  }
);

export function useFarms() {
  const dispatch = useDispatch();
  const networkId = useSelector((store: Store) => store.common.networkId);

  const { farms, requestState } = useSelector(
    (state: Store) => ({
      farms: state.farms.farms[networkId] as FarmType[] | undefined,
      requestState: state.farms.requestState,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () => dispatch(getFarms({ networkId })),
    [dispatch, networkId]
  );

  return {
    farms,
    requestState,
    getFarms: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(getFarms.async.started, (state) =>
      R.mergeDeepRight(state, {
        requestState: { ongoing: true },
      })
    )
    .case(getFarms.async.failed, (state, { error }) =>
      R.mergeRight(state, {
        requestState: { error, ongoing: false },
      })
    )
    .case(
      getFarms.async.done,
      (state, { params: { networkId }, result }) =>
        R.mergeDeepRight(state, {
          farms: { [networkId]: result },
          requestState: { error: false, ongoing: false },
        }) as any
    );
