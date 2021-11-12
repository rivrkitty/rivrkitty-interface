import Web3 from "web3";
import { SnackbarNotification } from "./snackbar";

export interface RequestState {
  ongoing: boolean;
  error: Error | null;
}

export type CommonState = {
  address: string | null;
  web3: Web3 | null;
  connected: boolean;
  networkId: number;
  connectWalletPending?: boolean;
  disconnectWalletPending?: boolean;
  notifications: SnackbarNotification[];
};
