import React from "react";
import Web3Modal from "web3modal";
import { makeStyles } from "@material-ui/core/styles";
import PowerIcon from "@material-ui/icons/Power";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { createWeb3Modal } from "../web3/createWeb3Modal";
import {
  useDisconnectWallet,
  useConnectWallet,
} from "../common/redux/selectors";
const { renderIcon } = require("@download/blockies");

const useStyles = makeStyles({
  button: {},
});

export default function WalletButton() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { disconnectWallet } = useDisconnectWallet();
  const [shortAddress, setShortAddress] = React.useState("");
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const [web3Modal, setModal] = React.useState<Web3Modal | null>(null);
  const { connectWallet, web3, address, connected } = useConnectWallet();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const connectWalletCallback = React.useCallback(() => {
    web3Modal && connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = React.useCallback(() => {
    web3 && web3Modal && disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);

  React.useEffect(() => {
    setModal(createWeb3Modal());
  }, [setModal]);

  React.useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!connected || !address || !canvas) {
      return;
    }

    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas.toDataURL();
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
    if (address.length < 11) {
      setShortAddress(address);
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [dataUrl, address, connected]);

  return (
    <>
      <Button
        disableElevation
        className={classes.button}
        onClick={connected ? disconnectWalletCallback : connectWalletCallback}
      >
        {connected ? (
          <>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <Avatar
              alt="address"
              src={dataUrl || ""}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "4px",
              }}
            />
            <Hidden xsDown>{shortAddress}</Hidden>
          </>
        ) : (
          <>
            <PowerIcon />
            <Hidden xsDown>{t("walletConnect")}</Hidden>
          </>
        )}
      </Button>
    </>
  );
}
