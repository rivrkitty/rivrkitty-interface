import { Button, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { defaultContentPadding } from "../../utils/theme";
import { isValidNetworkId } from "../../web3/getNetworkData";
import { networkSetup } from "../../web3/networkSetup";
import { Web3ModalProvider } from "../contexts/Web3ModalProvider";
import { useConnectWallet } from "../redux/connectWallet";

export default function NetworkChecker(props: {
  children: ReactElement | undefined;
}) {
  const { children } = props;

  const web3Modal = React.useContext(Web3ModalProvider);
  const { networkId, connectWallet } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const connect = React.useCallback(
    () => web3Modal && connectWallet(web3Modal),
    [web3Modal, connectWallet]
  );

  const isValid = networkId ? isValidNetworkId(networkId) : null;

  const targetNetworkSetup = React.useCallback(() => {
    networkSetup(1285)
      .then(() => {})
      .catch((e) => {
        if (typeof e === "object" && typeof e.message === "string") {
          enqueueSnackbar(e.message, { variant: "error" });
        } else if (typeof e === "string") {
          enqueueSnackbar(e, { variant: "error" });
        } else {
          enqueueSnackbar(t("networkUnknownError"), { variant: "error" });
        }
      });
  }, [t, enqueueSnackbar]);

  if (!isValid) {
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
              flexDirection: "column",
            }}
          >
            <Typography variant="body1">
              {isValid === null
                ? t("connectWalletInfo")
                : t("wrongNetworkInfo")}
            </Typography>
            {isValid === null ? (
              <Button
                sx={{ marginTop: 2 }}
                variant="outlined"
                onClick={connect}
              >
                {t("walletConnect")}
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 2 }}
                variant="outlined"
                onClick={targetNetworkSetup}
              >
                {t("switchToMoonriver")}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return <>{children}</>;
}
