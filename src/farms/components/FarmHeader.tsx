import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import IconButton from "@mui/material/IconButton";

export default function FarmHeader(props: { item: FarmType }) {
  const { item } = props;
  const { t } = useTranslation();
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
      <Typography variant="h6">
        {t("farmsPoolRateDetails", {
          amount: "XXX",
          token: item.rewardTokens[0],
        })}
      </Typography>
    </Box>
  );
}
