import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { FC, ReactNode } from "react";

import { AutoConnectProvider } from "./AutoConnectProvider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = [
    new PetraWallet(),
    new MartianWallet(),
    new RiseWallet(),
    new PontemWallet(),
    new FewchaWallet(),
  ];

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
};

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AutoConnectProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AutoConnectProvider>
  );
};
