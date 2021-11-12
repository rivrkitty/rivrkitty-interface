import React from "react";
import Paper from "@mui/material/Paper";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import FarmHeader from "./FarmHeader";
import FarmContent from "./FarmContent";

export default function Farm(props: { item: FarmType }) {
  const { item } = props;

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <FarmHeader item={item} />
      <FarmContent item={item} />
    </Paper>
  );
}
