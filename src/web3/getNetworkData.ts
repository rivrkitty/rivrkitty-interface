import { ICoreOptions } from "web3modal";

export const getNetworkConnectors = (): Partial<ICoreOptions> => ({
  network: "moonriver",
  cacheProvider: true,
  providerOptions: {
    injected: {
      package: null,
      display: {
        name: "Injected",
      },
    },
  },
});

export const getNetworkMulticall = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x8ecf62Cb46Ba4913d6FbDd6E74da4A6A7c40582F";
    case 1287:
      return "0x3C8c1948D959Ec186d35dDC26280D48100A81101";
    default:
      throw Error(`Multicall not configured for network id ${networkId}`);
  }
};

const networkTxUrls: { [networkId: number]: (hash: string) => string } = {
  1285: (hash: string) =>
    `https://blockscout.moonriver.moonbeam.network/tx/${hash}`,
};
export const getNetworkTxUrl = (networkId: number) => networkTxUrls[networkId];
