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

export const isValidNetworkId = (networkId: number) =>
  [1285, 1287].includes(networkId);

export const getNetworkMulticall = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x5f9Af1Fdc4eb0B0b3E3263e19030c1A0Da4121Fc";
    case 1287:
      return "0x3C8c1948D959Ec186d35dDC26280D48100A81101";
    default:
      throw Error(`Multicall not configured for network id ${networkId}`);
  }
};

export const getNetworkAdditionalRewardCalc = (networkId: number) => {
  switch (networkId) {
    case 1285:
      return "0x95018DD9DDDdC0C346Ac731D983362bFaf3e3d9B";
    case 1287:
      return "0x982365Eb0A3aE7C910810Ed45757DCBca1754712";
    default:
      throw Error(
        `Additional reward calc not configured for network id ${networkId}`
      );
  }
};

const networkTxUrls: { [networkId: number]: (hash: string) => string } = {
  1285: (hash: string) => `https://moonriver.moonscan.io/tx/${hash}`,
  1287: (hash: string) => `https://moonbase.moonscan.io/tx/${hash}`,
};
export const getNetworkTxUrl = (networkId: number) => networkTxUrls[networkId];
