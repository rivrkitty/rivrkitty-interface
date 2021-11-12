import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Summary from "./components/Summary";
import { defaultContentPadding } from "../utils/theme";
import List from "./components/List";

export default function Farm() {
  return (
    <Grid
      container
      spacing={2}
      component={Box}
      padding={2}
      sx={{ ...defaultContentPadding }}
    >
      <Grid item xs={12} lg={3}>
        <Summary />
      </Grid>
      <Grid item xs={12} lg={9}>
        <List />
      </Grid>
    </Grid>
  );
}
