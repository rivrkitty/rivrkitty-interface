import { TokensMap } from "./../model/reducer";
import { ReducerBuilder } from "typescript-fsa-reducers";
import * as R from "ramda";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createAsync } from "../../utils/reduxCreators";
import { FarmsState } from "../model/reducer";
import { API } from "../../utils/api";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { Store } from "../../utils/rootReducer";

export const fetchFarms = createAsync<{ networkId: number }, FarmType[], Error>(
  "FETCH_FARMS",
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
  });
  return tokens;
};

// tokens[token] = {
//       symbol: token,
//       decimals: tokenDecimals,
//       tokenAddress: tokenAddress,
//       tokenBalance: 0,
//       allowance: {
//         ...tokens[token]?.allowance,
//         [earnContractAddress]: tokenAddress ? 0 : Infinity,
//       },
//     };
//     tokens[earnedToken] = {
//       symbol: earnedToken,
//       decimals: 18,
//       tokenAddress: earnedTokenAddress,
//       tokenBalance: 0,
//       allowance: {
//         [earnContractAddress]: 0,
//       },

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
    .case(
      fetchFarms.async.done,
      (state, { params: { networkId }, result }) =>
        R.mergeDeepRight(state, {
          farms: { [networkId]: result },
          tokens: getTokensFromFarms(result, state.tokens),
          requestState: { error: false, ongoing: false },
        }) as any
    );
