import { Button, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onRetry: () => void;
};

export default function RetryButton(props: Props) {
  const { onRetry } = props;
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
    >
      <Typography variant="body1">{t("fetchError")}</Typography>
      <Button
        variant="outlined"
        sx={{ marginTop: 2, minWidth: 140 }}
        onClick={onRetry}
      >
        {t("fetchRetry")}
      </Button>
    </Box>
  );
}
