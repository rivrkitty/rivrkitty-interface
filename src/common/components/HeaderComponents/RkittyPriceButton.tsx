import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
import PriceTickerButton from "./PriceTickerButton";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useFetchPrices } from "../../redux/fetchPrices";
import { formatPrice } from "../../../utils/bignumber";

const useStyles = makeStyles({
  button: {
    marginRight: "8px",
  },
});

export default function RkittyPriceButton() {
  const classes = useStyles();

  const { prices } = useFetchPrices();

  const price = prices["rivrkitty"];

  return (
    <>
      <PriceTickerButton
        disableElevation
        variant="contained"
        color="secondary"
        className={classes.button}
        // onClick={}  method to open pop-up
      >
        <>
          <Avatar
            alt="rkittyImg"
            src={getSingleAssetSrc("RKITTY").default}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
            }}
          />
          <Hidden smDown>{price ? formatPrice(price) : ""}</Hidden>
        </>
      </PriceTickerButton>
    </>
  );
}
