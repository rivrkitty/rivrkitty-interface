import Web3 from "web3";
import { useCallback } from "react";
import * as R from "ramda";
import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "./../../utils/rootReducer";
import { createAsync } from "../../utils/reduxCreators";
import { FarmsState, TokensMap } from "../model/reducer";
import { getNetworkMulticall } from "../../web3/getNetworkData";
import { erc20ABI } from "../../web3/abi";
import { byDecimals } from "../../utils/bignumber";
import { ReducerBuilder } from "typescript-fsa-reducers";
import BigNumber from "bignumber.js";
import { CallContext } from "ethereum-multicall/dist/esm/models";

export const fetchBalances = createAsync<
  {
    networkId: number | null;
    address: string | null;
    web3: Web3 | null;
    tokens: TokensMap;
  },
  TokensMap,
  Error
>("FETCH_BALANCES", async ({ networkId, address, web3, tokens }, _1, _2) => {
  if (!address || !web3 || Object.values(tokens).length === 0 || !networkId) {
    return {};
  }

  const multicallAddress = getNetworkMulticall(networkId);
  const multicall = new Multicall({
    web3Instance: web3,
    tryAggregate: true,
    multicallCustomContractAddress: multicallAddress,
  });

  const contractCallContext: ContractCallContext<{
    tokenAddress: string;
  }>[] = [];

  Object.entries(tokens).forEach(([tokenAddress, token]) => {
    const calls: CallContext[] = [];
    calls.push({
      reference: "balanceOf",
      methodName: "balanceOf",
      methodParameters: [address],
    });
    Object.entries(token.allowance).forEach(([spender]) => {
      calls.push({
        reference: "allowance",
        methodName: "allowance",
        methodParameters: [address, spender],
      });
    });
    contractCallContext.push({
      reference: tokenAddress,
      contractAddress: tokenAddress,
      abi: erc20ABI,
      calls,
    });
  });

  const results: ContractCallResults = await multicall.call(
    contractCallContext
  );

  const newTokens: TokensMap = {};
  Object.entries(results.results).forEach(([tokenAddress, result]) => {
    result.callsReturnContext.forEach((c) => {
      if (!c.success) {
        return;
      }
      if (c.reference === "balanceOf") {
        newTokens[tokenAddress] = {
          ...tokens[tokenAddress],
          balance: new BigNumber(c.returnValues[0].hex).toString(),
        };
      } else if (c.reference === "allowance") {
        newTokens[tokenAddress] = {
          ...newTokens[tokenAddress],
          allowance: {
            ...newTokens[tokenAddress].allowance,
            [c.methodParameters[1]]: new BigNumber(
              c.returnValues[0].hex
            ).toString(),
          },
        };
      }
    });
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

  const boundAction = useCallback(
    (args: { tokens: TokensMap }) => {
      return dispatch(fetchBalances({ networkId, address, web3, ...args }));
    },
    [dispatch, networkId, address, web3]
  );

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
    .case(fetchBalances.async.done, (state, { result }) => {
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
    });
