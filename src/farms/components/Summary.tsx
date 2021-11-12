import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import FancyButton from "../../common/components/FancyButton";

export default function Summary() {
  const { t } = useTranslation();

  return (
    <Paper
      color="secondary"
      sx={{ position: "relative", backgroundColor: "secondary.main", p: 2 }}
    >
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
      <FancyButton sx={{ position: "absolute", bottom: 12, right: 12 }}>
        {t("farmsHarvestAll")}
      </FancyButton>
    </Paper>
  );
}
