import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import { useSnackbar } from "notistack";
import React from "react";
import { useTranslation } from "react-i18next";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { useFarms } from "../redux/fetchFarms";
import { useFetchHarvest } from "../redux/fetchHarvest";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";

const getAmountText = (value: BigNumber) => {
  return value.decimalPlaces(4, BigNumber.ROUND_DOWN).toFormat();
};

export default function RewardInfo(props: { item: FarmType }) {
  const { item } = props;

  const { t } = useTranslation();
  const { farms } = useFarms();
  const { infoPendingReward, infoAddPendingReward, fetchPoolInfo } =
    useFetchPoolInfo();
  const { fetchHarvest, fetchHarvestPending } = useFetchHarvest();
  const { enqueueSnackbar } = useSnackbar();

  const handleHarvest = () => {
    fetchHarvest({
      contractAddress: item.chefAddress,
      pid: item.poolId,
      tokenAddress: item.tokenAddress,
    })
      .then(() => {
        enqueueSnackbar(t("farmsHarvestSuccess"), { variant: "success" });
        fetchPoolInfo({
          farms: farms || [],
          pid: item.poolId,
          chefAddress: item.chefAddress,
        });
      })
      .catch((error) =>
        enqueueSnackbar(t("farmsHarvestError", { error }), {
          variant: "error",
        })
      );
  };

  const harvesting = fetchHarvestPending[item.tokenAddress];
  const hasTwoRewards = item.rewardTokens.length === 2;

  return (
    <>
      {item.rewardTokens.map((tok, index) => (
        <Grid
          key={tok}
          item
          xs={hasTwoRewards ? 6 : 12}
          lg={hasTwoRewards ? 4 : 8}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            sx={{ height: 44, width: 44, marginRight: 1 }}
            alt={tok}
            variant="circular"
            imgProps={{ style: { objectFit: "contain" } }}
            src={getSingleAssetSrc(tok).default}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">
              {tok}{" "}
              <Box sx={{ color: "primary.main", display: "inline" }}>
                {t("farmingEarned")}
              </Box>
            </Typography>
            <Typography variant="h5" fontWeight="600">
              {getAmountText(
                index === 0
                  ? infoPendingReward(
                      item.chefAddress,
                      item.tokenAddress,
                      item.poolId
                    )
                  : infoAddPendingReward(
                      item.chefAddress,
                      item.tokenAddress,
                      item.poolId
                    )
              )}{" "}
              {tok}
            </Typography>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12} lg={4}>
        <Button
          variant="contained"
          color="info"
          fullWidth
          sx={{ textTransform: "none" }}
          disabled={harvesting}
          onClick={handleHarvest}
        >
          {harvesting ? t("farmsHarvesting") : t("farmsHarvest")}
        </Button>
      </Grid>
    </>
  );
}
