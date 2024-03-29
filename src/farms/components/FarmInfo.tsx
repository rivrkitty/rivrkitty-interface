import React from "react";
import Loader from "../../common/components/Loader";
import { FarmType } from "../model/reducer";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import AddLpInfo from "./AddLpInfo";
import RewardInfo from "./RewardsInfo";

export default function FarmInfo(props: { item: FarmType }) {
  const { item } = props;

  const { hasTokenBalance } = useFetchPoolInfo();

  const hasTokenBal = hasTokenBalance(item.chefAddress, item.poolId);
  if (hasTokenBal === null) {
    return <Loader minHeight={80} />;
  } else if (!!hasTokenBal) {
    return <RewardInfo {...props} />;
  } else {
    return <AddLpInfo {...props} />;
  }
}
