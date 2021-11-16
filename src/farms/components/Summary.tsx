import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import FancyButton from "../../common/components/FancyButton";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFarms } from "../redux/fetchFarms";
import BigNumber from "bignumber.js";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import { useFetchHarvest } from "../redux/fetchHarvest";

export default function Summary() {
  const { t } = useTranslation();

  const { farms: _farms } = useFarms();
  const { tokenBalance } = useFetchBalances();
  const { infoPendingReward } = useFetchPoolInfo();
  const { fetchHarvestAll, fetchHarvestPending } = useFetchHarvest();

  const farms = React.useMemo(() => _farms || [], [_farms]);
  const pawsTokenAddress =
    farms.length > 0 ? farms[0].rewardTokensAddress[0] : null;

  const pendingSum = React.useMemo(
    () =>
      farms
        .map((f) => infoPendingReward(f.chefAddress, f.tokenAddress, f.poolId))
        .reduce(
          (prev, currentValue) => prev.plus(currentValue),
          new BigNumber(0)
        ),
    [farms, infoPendingReward]
  );
  const isHarvesting = React.useMemo(
    () => Object.values(fetchHarvestPending).filter((v) => !!v).length > 0,
    [fetchHarvestPending]
  );

  const handleHarvestAll = () => fetchHarvestAll({ farms: farms });

  return (
    <Paper
      color="secondary"
      sx={{ position: "relative", backgroundColor: "secondary.main", p: 2 }}
    >
      <Typography variant="h5">{t("farmsTitle")}</Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {t("farmsDescription")}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        {t("farmsHoldingTitle")}
      </Typography>
      <Typography variant="h6">
        {pawsTokenAddress
          ? tokenBalance(pawsTokenAddress)
              .decimalPlaces(4, BigNumber.ROUND_DOWN)
              .toFormat()
          : "0"}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        {t("farmsPendingTitle")}
      </Typography>
      <Typography variant="h6">
        {pendingSum.decimalPlaces(4, BigNumber.ROUND_DOWN).toFormat()}
      </Typography>
      <FancyButton
        sx={{ position: "absolute", bottom: 12, right: 12 }}
        disabled={isHarvesting || pendingSum.isZero()}
        onClick={handleHarvestAll}
      >
        {isHarvesting ? t("farmsHarvesting") : t("farmsHarvestAll")}
      </FancyButton>
    </Paper>
  );
}
