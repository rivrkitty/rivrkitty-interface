import { Button, DialogContent, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utils/bignumber";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useFetchPrices } from "../../redux/fetchPrices";
import huckle from "../../../assets/token/Huckleberry.png";
import solar from "../../../assets/token/SOLAR.png";
import rubic from "../../../assets/token/RUBIC.png";

const tokenSupply = new BigNumber(10).pow(12);

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RkittyDialog(props: Props) {
  const { onClose, open } = props;

  const { prices } = useFetchPrices();
  const { t } = useTranslation();

  const price = new BigNumber(prices["rivrkitty"] || 0);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          border: "1px solid #E78579",
          backgroundColor: "background.default",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          paddingLeft: 7,
          paddingRight: 7,
        }}
      >
        <Avatar
          alt="address"
          src={getSingleAssetSrc("RKITTY").default}
          style={{
            width: "140px",
            height: "140px",
          }}
        />
        <Typography variant="body1" sx={{ marginTop: 5 }}>
          {t("tokenPrice")}
        </Typography>
        <Typography variant="h6">
          <b>{price ? formatPrice(price) : ""}</b>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {t("tokkenSupply")}
        </Typography>
        <Typography variant="h6">
          <b>{tokenSupply.toFormat()}</b>
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {t("marketCap")}
        </Typography>
        <Typography variant="h6">
          <b>${price.times(tokenSupply).toFormat()}</b>
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item>
            <Button
              href="https://www.huckleberry.finance/#/swap?outputCurrency=0xC2b0435276139731d82Ae2Fa8928c9b9De0761c1"
              variant="outlined"
              target="_blank"
              rel="noopener"
              endIcon={
                <img
                  src={huckle}
                  alt="Huckleberry"
                  style={{ width: 30, height: 30 }}
                />
              }
            >
              {t("buyOn")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="https://app.solarbeam.io/exchange/swap?outputCurrency=0xC2b0435276139731d82Ae2Fa8928c9b9De0761c1"
              variant="outlined"
              target="_blank"
              rel="noopener"
              endIcon={
                <img
                  src={solar}
                  alt="Solar"
                  style={{ width: 30, height: 30 }}
                />
              }
            >
              {t("buyOn")}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ marginTop: 0 }}
        >
          <Grid item>
            <Button
              href="https://rubic.exchange/?from=BNB&amp;to=RKITTY&amp;fromChain=BSC&amp;toChain=MOONRIVER&amp;amount=1"
              variant="outlined"
              target="_blank"
              rel="noopener"
              endIcon={
                <img
                  src={rubic}
                  alt="Rubic"
                  style={{ width: 30, height: 30 }}
                />
              }
            >
              {t("buyOn")}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
