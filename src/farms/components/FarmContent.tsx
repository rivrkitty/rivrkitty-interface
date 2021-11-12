import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FarmType } from "../models";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const getRewardsText = (tokens: string[]) => tokens.join(", ");

export default function FarmContent(props: { item: FarmType }) {
  const { item } = props;
  const { t } = useTranslation();

  return (
    <Grid
      container
      padding={2}
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={10} lg={7}>
        <Typography variant="body2" sx={{ marginRight: 1 }}>
          {t("farmsLPDescriptionTitle")}
          <br />
          {t("farmsLPDescription", {
            token: item.tokenName,
            platform: item.platform,
            rewards: getRewardsText(item.rewardTokens),
          })}
        </Typography>
      </Grid>
      <Grid item xs={2} lg={1}>
        <Avatar
          sx={{
            height: 44,
            width: 44,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt={item.platform}
          variant="circular"
          imgProps={{
            style: {
              objectFit: "contain",
            },
          }}
          src={getSingleAssetSrc(item.platform).default}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Button
          variant="contained"
          color="info"
          fullWidth
          sx={{ textTransform: "none" }}
          href={item.buyTokenUrl}
        >
          {t("farmsAddLiquidity", { token: item.name })}
        </Button>
      </Grid>
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={12} lg={6}>
          <Deposit item={item} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Withdraw item={item} />
        </Grid>
      </Grid>
    </Grid>
  );
}
