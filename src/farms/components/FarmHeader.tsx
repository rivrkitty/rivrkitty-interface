import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import IconButton from "@mui/material/IconButton";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import BigNumber from "bignumber.js";

const formatPoolRate = (poolRate: BigNumber | null) => {
  if (!poolRate) {
    return "0";
  } else {
    return poolRate.decimalPlaces(0, BigNumber.ROUND_DOWN).toFormat();
  }
};

export default function FarmHeader(props: { item: FarmType }) {
  const { item } = props;
  const { t } = useTranslation();

  const { infoPoolRate } = useFetchPoolInfo();

  const hasTwoRewards = item.rewardTokens.length === 2;
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#25324A",
        height: 64,
        padding: 1,
        alignItems: "center",
      }}
    >
      {item.tokenAssets.map((a) => (
        <Avatar
          key={a}
          sx={{ height: 44, width: 44, marginRight: 1 }}
          alt={a}
          variant="circular"
          imgProps={{ style: { objectFit: "contain" } }}
          src={getSingleAssetSrc(a).default}
        />
      ))}
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ marginLeft: 1, marginRight: 1 }}
      >
        {item.name}
      </Typography>
      <IconButton
        color="primary"
        href={item.buyTokenUrl}
        target="_blank"
        rel="noopener"
      >
        <OpenInNewIcon />
      </IconButton>
      <Box sx={{ flex: 1 }} />
      <Typography variant="body2" sx={{ marginRight: 1, marginTop: "6px" }}>
        {t("farmsPoolRate")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {item.rewardTokens.map((tok, index) => (
          <Typography variant={hasTwoRewards ? "body1" : "h6"}>
            {formatPoolRate(
              infoPoolRate(
                index === 0 ? item.chefAddress : item.addRewardChefAddress!!,
                item.rewardTokensAddress[index],
                index === 0 ? item.poolId : item.addRewardChefPid!!
              )
            )}{" "}
            <b>{tok}</b> {t("farmsPoolRateDetails")}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
