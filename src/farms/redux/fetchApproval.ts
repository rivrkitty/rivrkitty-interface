import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { approval } from "../../web3/approval";
import { FarmsState } from "../model/reducer";

type BaseFetchApprovalProps = {
  tokenAddress: string;
  contractAddress: string;
};

interface FetchApprovalProps extends BaseFetchApprovalProps {
  address: string | null;
  web3: Web3 | null;
}

export const fetchApproval = createAsync<FetchApprovalProps, string, Error>(
  "FETCH_APPROVAL",
  async ({ address, web3, tokenAddress, contractAddress }, dispatch, _1) => {
    if (!web3 || !address) {
      return;
    }
    const result = await approval({
      web3,
      address,
      tokenAddress,
      contractAddress,
      dispatch,
    });
    return result as any;
  }
);

export function useFetchApproval() {
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector((state: Store) => ({
    fetchApprovalPending: state.farms.fetchApprovalPending,
  }));
  const { web3, address } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
  }));

  const boundAction = useCallback(
    (data: BaseFetchApprovalProps) =>
      dispatch(thunkToAction(fetchApproval as any)({ ...data, web3, address })),
    [dispatch, web3, address]
  );

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchApproval.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchApprovalPending: {
        ...state.fetchApprovalPending,
        [tokenAddress]: true,
      },
    }))
    .case(
      fetchApproval.async.failed,
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [tokenAddress]: false,
        },
      })
    )
    .case(
      fetchApproval.async.done,
      (state, { params: { tokenAddress, contractAddress }, result }) => {
        const { tokens } = state;
        tokens[tokenAddress].allowance[contractAddress] = result;
        return {
          ...state,
          tokens,
          fetchApprovalPending: {
            ...state.fetchApprovalPending,
            [tokenAddress]: false,
          },
        };
      }
    );
