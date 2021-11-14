import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import PriceTickerButton from "./PriceTickerButton";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

const useStyles = makeStyles({
  button: {
      marginRight:'8px'
  },
});

export default function MovrPriceButton() {
  const classes = useStyles();
  const { t } = useTranslation();

  return <>
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
            src={getSingleAssetSrc('MOVR').default}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
            }}
          />
          <Hidden smDown>{`$0.00`}</Hidden>
        </>
    
    </PriceTickerButton>
  </>;
}
