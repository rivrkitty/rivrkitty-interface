import Web3Modal from "web3modal";
import React from "react";
import { createWeb3Modal } from "../../web3/createWeb3Modal";

export const Web3ModalProvider = React.createContext(null as Web3Modal | null);

export function Web3ModalContainer(props: { children: React.ReactNode }) {
  const { children } = props;

  const [web3Modal, setModal] = React.useState<Web3Modal | null>(null);

  React.useEffect(() => {
    setModal(createWeb3Modal());
  }, [setModal]);

  return (
    <Web3ModalProvider.Provider value={web3Modal}>
      {children}
    </Web3ModalProvider.Provider>
  );
}
