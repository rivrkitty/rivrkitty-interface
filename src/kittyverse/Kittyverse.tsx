import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import { defaultContentPadding } from "../utils/theme";
import KittyverseLeftMenu from "../common/components/KittyverseComponents/KittyverseLeftMenu";
import MyPawtals from "./MyPawtals";
import MyClaims from "./MyClaims";
import KittyVerseHome from "./KittyVerseHome";

export default function Kittyverse() {
  return (
    <Grid
      container
      spacing={2}
      component={Box}
      padding={2}
      sx={{ ...defaultContentPadding }}
    >
      <Grid item xs={12} lg={3}>
        <KittyverseLeftMenu />
      </Grid>
      <Grid item xs={12} lg={9}>
        {/* <Grid item xs={12} justifyContent="center">
          <SectionHeader />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            width= "100%"
          >

          </Box>

        </Grid> */}
        <Routes>
          <Route path="/" element={<KittyVerseHome />} />
          <Route path="/mypawtals" element={<MyPawtals />} />
          <Route
            path="/myclaims"
            element={<MyClaims completed={100} total={1000} />}
          />
        </Routes>
      </Grid>
    </Grid>
  );
}
