import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { defaultContentPadding } from "../../utils/theme";
import { isValidNetworkId } from "../../web3/getNetworkData";
import { useConnectWallet } from "../redux/connectWallet";

export default function NetworkChecker(props: {
  children: ReactElement | undefined;
}) {
  const { children } = props;
  const { networkId } = useConnectWallet();
  const { t } = useTranslation();

  const isValid = networkId ? isValidNetworkId(networkId) : null;

  if (isValid === false) {
    return (
      <Paper
        sx={{
          backgroundColor: "background.default",
          padding: 1,
          margin: 3,
        }}
      >
        <Grid
          container
          spacing={2}
          component={Box}
          padding={2}
          sx={{ ...defaultContentPadding }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 180,
            }}
          >
            <Typography variant="body1">{t("wrongNetworkInfo")}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return <>{children}</>;
}
