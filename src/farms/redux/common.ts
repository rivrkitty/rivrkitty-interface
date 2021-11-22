import { PoolInfo, PoolInfoMap } from "../model/reducer";

export const getPoolInfo = (
  poolInfo: PoolInfoMap,
  chefAddress: string,
  pid: number
): PoolInfo | null => {
  const chefPoolInfo = poolInfo[chefAddress] as any;
  if (!chefPoolInfo) {
    return null;
  }
  const info = chefPoolInfo[pid] as PoolInfo | undefined;
  if (!info) {
    return null;
  }
  return info;
};
