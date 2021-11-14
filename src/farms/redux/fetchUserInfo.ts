import { userInfo } from "./../../web3/userInfo";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { FarmsState } from "../model/reducer";
import BigNumber from "bignumber.js";
import { byDecimals } from "../../utils/bignumber";

type BaseFetchUserInfoProps = {
  contractAddress: string;
  pid: number;
  tokenAddress: string;
};

interface FetchUserInfoProps extends BaseFetchUserInfoProps {
  address: string | null;
  web3: Web3 | null;
}

export const fetchUserInfo = createAsync<FetchUserInfoProps, BigNumber, Error>(
  "FETCH_USER_INFO",
  async ({ address, web3, ...other }, _1, _2) => {
    if (!web3 || !address) {
      return;
    }
    return await userInfo({
      web3,
      address,
      ...other,
    });
  }
);

export function useFetchUserInfo() {
  const dispatch = useDispatch();

  const { fetchUserInfoPending, userInfo, tokens } = useSelector(
    (state: Store) => ({
      fetchUserInfoPending: state.farms.fetchUserInfoPending,
      userInfo: state.farms.userInfo,
      tokens: state.farms.tokens,
    })
  );

  const { web3, address } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
  }));

  const boundAction = useCallback(
    (data: BaseFetchUserInfoProps) => {
      return dispatch(fetchUserInfo({ web3, address, ...data }));
    },
    [dispatch, web3, address]
  );

  const infoTokenBalance = (tokenAddress: string) =>
    byDecimals(
      userInfo[tokenAddress] || new BigNumber(0),
      tokens[tokenAddress].decimals
    );

  return {
    userInfo,
    infoTokenBalance,
    fetchUserInfo: boundAction,
    fetchUserInfoPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<FarmsState>
): ReducerBuilder<FarmsState> =>
  builder
    .case(fetchUserInfo.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchUserInfoPending: {
        ...state.fetchUserInfoPending,
        [tokenAddress]: true,
      },
    }))
    .case(
      fetchUserInfo.async.failed,
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchUserInfoPending: {
          ...state.fetchUserInfoPending,
          [tokenAddress]: false,
        },
      })
    )
    .case(
      fetchUserInfo.async.done,
      (state, { params: { tokenAddress }, result }) => ({
        ...state,
        fetchUserInfoPending: {
          ...state.fetchUserInfoPending,
          [tokenAddress]: false,
        },
        userInfo: {
          [tokenAddress]: result,
        },
      })
    );
