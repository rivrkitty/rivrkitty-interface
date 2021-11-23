export const networkSettings: { [id: number]: any } = {
  1285: {
    chainId: `0x${parseInt("1285", 10).toString(16)}`,
    chainName: "Moonriver",
    nativeCurrency: {
      name: "MOVR",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: ["https://moonriver.api.onfinality.io/public"],
    blockExplorerUrls: ["https://moonriver.moonscan.io/"],
  },
  1287: {
    chainId: `0x${parseInt("1287", 10).toString(16)}`,
    chainName: "Moonbase Alpha",
    nativeCurrency: {
      name: "DEV",
      symbol: "DEV",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.moonbeam.network"],
    blockExplorerUrls: ["https://moonbase.moonscan.io/"],
  },
};

export const networkSetup = (chainId: number) => {
  return new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      if (networkSettings.hasOwnProperty(chainId)) {
        provider
          .request({
            method: "wallet_addEthereumChain",
            params: [networkSettings[chainId]],
          })
          .then(resolve)
          .catch(reject);
      } else {
        reject(
          new Error(`No network settings configured for chainId: '${chainId}'`)
        );
      }
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });
};
