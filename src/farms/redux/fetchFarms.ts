import { FarmType, TokensMap } from "./../model/reducer";
import { ReducerBuilder } from "typescript-fsa-reducers";
import * as R from "ramda";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createAsync } from "../../utils/reduxCreators";
import { FarmsState } from "../model/reducer";
import { API } from "../../utils/api";
import { Store } from "../../utils/rootReducer";

export const fetchFarms = createAsync<
  { networkId: number | null },
  FarmType[] | null,
  Error
>("FETCH_FARMS", async ({ networkId }, _1, _2) => {
  if (!networkId) {
    return null;
  }
  const result = await API.get<FarmType[]>(`/farms/${networkId}`);
  return result.data;
});

export function useFarms() {
  const dispatch = useDispatch();
  const networkId = useSelector((store: Store) => store.common.networkId);

  const { farms, requestState } = useSelector(
    (state: Store) => ({
      farms: networkId
        ? (state.farms.farms[networkId] as FarmType[] | undefined)
        : null,
      requestState: state.farms.requestState,
    }),
    shallowEqual
  );
  const boundAction = useCallback(() => {
    dispatch(fetchFarms({ networkId }));
  }, [dispatch, networkId]);

  return {
    farms,
    requestState,
    fetchFarms: boundAction,
  };
}

const getTokensFromFarms = (farms: FarmType[], tokens: TokensMap) => {
  farms.forEach((f) => {
    const current = tokens[f.tokenAddress] || {
      balance: 0,
      allowance: {
        [f.chefAddress]: null,
      },
    };
    tokens[f.tokenAddress] = {
      ...current,
      symbol: f.tokenName,
      decimals: f.tokenDecimals,
      address: f.tokenAddress,
    };
    f.rewardTokensAddress.forEach((t, index) => {
      const currentReward = tokens[t] || {
        balance: 0,
        allowance: {},
      };
      tokens[t] = {
        ...currentReward,
        symbol: f.rewardTokens[index],
        decimals: f.rewardTokensDecimals[index],
        address: t,
      };
    });
  });
  return tokens;
};

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchFarms.async.started, (state) =>
      R.mergeDeepRight(state, {
        requestState: { ongoing: true },
      })
    )
    .case(fetchFarms.async.failed, (state, { error }) =>
      R.mergeRight(state, {
        requestState: { error, ongoing: false },
      })
    )
    .case(fetchFarms.async.done, (state, { params: { networkId }, result }) => {
      const change: any = {
        requestState: { error: false, ongoing: false },
      };
      if (networkId && result) {
        change["farms"] = { [networkId]: result };
        change["tokens"] = getTokensFromFarms(result, state.tokens);
      }

      return R.mergeDeepRight(state, change) as any;
    });
