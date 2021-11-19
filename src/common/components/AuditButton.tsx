import { Button } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";

const CustomButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    color: "white",
    backgroundColor: "transparent",
    border: "1px solid #E78579",
    fontSize: "0.8em",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "0px",
    "&:hover": {
      backgroundColor: "#E78579",
    },
  },
}))(Button);

export default function AuditButton() {
  const { t } = useTranslation();
  return (
    <CustomButton
      sx={{
        position: "absolute",
        bottom: "0px",
        left: {
          xs: 2,
          md: "5%",
          xl: "10%",
        },
        zIndex: 2,
      }}
      variant="contained"
      endIcon={<OpenInNewIcon />}
      href="https://github.com/rivrkitty/rivrkitty-contracts/raw/master/audits/TechRate.pdf"
      {...{ target: "_blank", rel: "noopener" }}
    >
      {t("auditedBy")}
    </CustomButton>
  );
}
