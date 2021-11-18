import { Button, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utils/bignumber";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useFetchPrices } from "../../redux/fetchPrices";
import huckle from "../../../assets/token/Huckleberry.png";
import solar from "../../../assets/token/SOLAR.png";

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
    <Dialog onClose={onClose} open={open}>
      <Box
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
            width: "120px",
            height: "120px",
          }}
        />
        <Typography variant="body2" sx={{ marginTop: 5 }}>
          {t("tokenPrice")}
        </Typography>
        <Typography variant="body1">
          <b>{price ? formatPrice(price) : ""}</b>
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {t("tokkenSupply")}
        </Typography>
        <Typography variant="body1">
          <b>{tokenSupply.toFormat()}</b>
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {t("marketCap")}
        </Typography>
        <Typography variant="body1">
          <b>${price.times(tokenSupply).toFormat()}</b>
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button
              href="https://www.huckleberry.finance/#/swap?outputCurrency=0xC2b0435276139731d82Ae2Fa8928c9b9De0761c1"
              variant="contained"
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
              {t("buyOnHuckle")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="https://app.solarbeam.io/exchange/swap?outputCurrency=0xC2b0435276139731d82Ae2Fa8928c9b9De0761c1"
              variant="contained"
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
              {t("buyOnSolar")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
