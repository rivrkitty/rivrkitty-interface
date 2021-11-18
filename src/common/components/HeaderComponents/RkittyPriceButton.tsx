import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Hidden from "@mui/material/Hidden";
import Avatar from "@mui/material/Avatar";
import PriceTickerButton from "./PriceTickerButton";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useFetchPrices } from "../../redux/fetchPrices";
import { formatPrice } from "../../../utils/bignumber";
import RkittyDialog from "./RkittyDialog";

const useStyles = makeStyles({
  button: {
    marginRight: "8px",
  },
});

export default function RkittyPriceButton() {
  const classes = useStyles();

  const { prices } = useFetchPrices();
  const [kittyDialogOpen, setKittyDialogOpen] = React.useState(false);

  const price = prices["rivrkitty"];

  const handleClick = () => setKittyDialogOpen(true);

  return (
    <>
      <PriceTickerButton
        disableElevation
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleClick}
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
          <Hidden smDown>
            <b>{price ? formatPrice(price) : ""}</b>
          </Hidden>
        </>
      </PriceTickerButton>
      <RkittyDialog
        open={kittyDialogOpen}
        onClose={() => setKittyDialogOpen(false)}
      />
    </>
  );
}
