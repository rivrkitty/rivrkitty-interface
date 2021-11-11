import React from "react";
import withStyles from '@mui/styles/withStyles';
import Button from "@mui/material/Button";

export default withStyles((theme) => ({
  root: {
    borderRadius: 40,
    textTransform: "none",
    paddingLeft: 24,
    paddingRight: 24,
    fontWeight: 400,
  },
}))(Button);
