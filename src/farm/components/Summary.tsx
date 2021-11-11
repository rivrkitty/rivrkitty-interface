import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function Summary() {
  const { t } = useTranslation();

  return (
    <Paper color="secondary" sx={{ backgroundColor: "secondary.main" }}>
      <Box padding={2}>
        <Typography variant="h5">{t("farmsTitle")}</Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {t("farmsDescription")}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {t("farmsHoldingTitle")}
        </Typography>
        <Typography variant="h6">XXX</Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {t("farmsPendingTitle")}
        </Typography>
        <Typography variant="h6">XXX</Typography>
      </Box>
    </Paper>
  );
}
