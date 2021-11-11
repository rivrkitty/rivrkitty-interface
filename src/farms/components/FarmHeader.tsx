import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { FarmType } from "../models";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

export default function FarmHeader(props: { item: FarmType }) {
  const { item } = props;
  const { t } = useTranslation();
  console.log(item.tokenAssets, getSingleAssetSrc(item.tokenAssets[0]).default);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#192232",
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
      <Typography variant="h5" fontWeight="600" sx={{ marginLeft: 1 }}>
        {item.name}
      </Typography>
      <Box sx={{ flex: 1 }} />
      <Typography variant="body2" sx={{ marginRight: 1 }}>
        {t("farmsPoolRate")}
      </Typography>
      <Typography variant="h6">
        {t("farmsPoolRateDetails", {
          amount: "XXX",
          token: item.rewardTokens[0],
        })}
      </Typography>
    </Box>
  );
}
