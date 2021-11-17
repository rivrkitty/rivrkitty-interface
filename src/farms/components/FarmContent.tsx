import React from "react";
import Grid from "@mui/material/Grid";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import FarmInfo from "./FarmInfo";
import { FarmType } from "../model/reducer";

export default function FarmContent(props: { item: FarmType }) {
  const { item } = props;

  return (
    <Grid
      container
      padding={2}
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <FarmInfo item={item} />
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
