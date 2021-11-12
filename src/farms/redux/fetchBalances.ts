import Web3 from "web3";
import { useCallback } from "react";
import * as R from "ramda";
import { MultiCall } from "eth-multicall";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "./../../utils/rootReducer";
import { createAsync } from "../../utils/reduxCreators";
import { FarmsState, TokensMap } from "../model/reducer";
import { getNetworkMulticall } from "../../web3/getNetworkData";
import { erc20ABI } from "../../web3/abi";
import { byDecimals } from "../../utils/bignumber";
import { ReducerBuilder } from "typescript-fsa-reducers";

export const fetchBalances = createAsync<
  {
    networkId: number;
    address: string | null;
    web3: Web3 | null;
    tokens: TokensMap;
  },
  TokensMap,
  Error
>("FETCH_BALANCES", async ({ networkId, address, web3, tokens }, _1, _2) => {
  if (!address || !web3) {
    return {};
  }

  const multicallAddress = getNetworkMulticall(networkId);
  const multicall = new MultiCall(web3, multicallAddress);

  const balanceCalls: any = [];
  const allowanceCalls: any = [];

  Object.entries(tokens).forEach(([address, token]) => {
    const tokenContract = new web3.eth.Contract(erc20ABI as any, token.address);
    balanceCalls.push({
      balance: tokenContract.methods.balanceOf(address),
      address,
    });
    Object.entries(token.allowance).forEach(([spender]) => {
      allowanceCalls.push({
        allowance: tokenContract.methods.allowance(address, spender),
        spender: spender,
        address,
      });
    });
  });

  const [balanceResults, allowanceResults] = await multicall.all([
    balanceCalls,
    allowanceCalls,
  ]);

  const newTokens: TokensMap = {};

  balanceResults.forEach((balanceResult) => {
    newTokens[balanceResult.address] = {
      ...tokens[balanceResult.address],
      balance: balanceResult.balance,
    };
  });

  allowanceResults.forEach((allowanceResult) => {
    newTokens[allowanceResult.address] = {
      ...newTokens[allowanceResult.address],
      allowance: {
        ...newTokens[allowanceResult.address].allowance,
        [allowanceResult.spender]: allowanceResult.allowance,
      },
    };
  });
  return newTokens;
});

export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchBalancesRequestState, fetchBalancesDone } = useSelector(
    (state: Store) => ({
      tokens: state.farms.tokens,
      fetchBalancesRequestState: state.farms.fetchBalancesRequestState,
      fetchBalancesDone: state.farms.fetchBalancesDone,
    }),
    shallowEqual
  );

  const { web3, address, networkId } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
    networkId: state.common.networkId,
  }));

  const boundAction = useCallback(() => {
    return dispatch(fetchBalances({ networkId, address, web3, tokens }));
  }, [dispatch, networkId, address, web3, tokens]);

  const tokenBalance = (tokenAddress: string) => {
    return byDecimals(
      tokens[tokenAddress]?.balance || 0,
      tokens[tokenAddress].decimals
    );
  };

  return {
    tokens,
    tokenBalance,
    fetchBalances: boundAction,
    fetchBalancesDone,
    fetchBalancesRequestState,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchBalances.async.started, (state) =>
      R.mergeDeepRight(state, {
        fetchBalancesRequestState: { ongoing: true },
      })
    )
    .case(fetchBalances.async.failed, (state, { error }) =>
      R.mergeDeepRight(state, {
        fetchBalancesRequestState: { ongoing: false, error },
      })
    )
    .case(
      fetchBalances.async.done,
      (state, { params: { networkId }, result }) => {
        const newAndUpdatedTokens: TokensMap = {};
        Object.entries(result).forEach(([address, token]) => {
          newAndUpdatedTokens[address] = {
            ...state.tokens[address],
            ...token,
            allowance: {
              ...state.tokens[address]?.allowance,
              ...token.allowance,
            },
          };
        });

        return {
          ...state,
          tokens: {
            ...state.tokens,
            ...newAndUpdatedTokens,
          },
          fetchBalancesRequestState: {
            error: null,
            ongoing: false,
          },
          fetchBalancesDone: true,
        };
      }
    );
