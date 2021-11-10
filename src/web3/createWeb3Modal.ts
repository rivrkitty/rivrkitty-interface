import Web3Modal from "web3modal";

import { getNetworkConnectors } from "./getNetworkData";

export const createWeb3Modal = () => {
  const connectors = getNetworkConnectors();
  const modal = new Web3Modal(connectors);

  const providerOptions = connectors.providerOptions || {};
  if (modal.cachedProvider && !(modal.cachedProvider in providerOptions)) {
    modal.clearCachedProvider();
  }

  return modal;
};
