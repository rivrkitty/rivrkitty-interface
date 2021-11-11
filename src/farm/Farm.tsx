import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Summary from "./components/Summary";
import { defaultContentPadding } from "../utils/theme";

export default function Farm() {
  return (
    <Grid
      container
      spacing={2}
      component={Box}
      padding={2}
      sx={{ ...defaultContentPadding }}
    >
      <Grid item xs={12} md={3}>
        <Summary />
      </Grid>
      <Grid item xs={12} md={9}>
        <div />
      </Grid>
    </Grid>
  );
}
