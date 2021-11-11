import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default withStyles((theme) => ({
  root: {
    borderRadius: 40,
    textTransform: "none",
    paddingLeft: 24,
    paddingRight: 24,
    fontWeight: 400,
  },
}))(Button);
