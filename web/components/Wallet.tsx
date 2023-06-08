import { cn } from "@/lib/cn";
import { WalletReadyState, useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Wallet({ className, ...rest }: Props) {
  const { connect, disconnect, account, wallet, wallets } = useWallet();

  return (
    <div className={cn("flex flex-wrap justify-center text-center", className)} {...rest}>
      <div className="w-full">
        {wallet && account && account.address && account.publicKey ? (
          <div className="flex w-full flex-col space-y-3">
            <div className="flex w-full flex-row items-center justify-center space-x-3">
              <div className="flex h-12 w-full flex-row items-center space-x-3 rounded-xl bg-zinc-700 px-3">
                <Image src={wallet.icon} alt={wallet.name} width={26} height={26} />
                <p>{account.address.slice(0, 6) + " ... " + account.address.slice(-6)}</p>
              </div>
              <div
                onClick={disconnect}
                className="flex flex-row items-center px-4 h-12 hover:cursor-pointer bg-red-500 bg-opacity-10 rounded-xl hover:bg-opacity-25">
                <p className="block text-sm font-medium text-red-500">Disconnect</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {wallets.map((wallet, index: number) => (
              <div
                key={index}
                onClick={async () =>
                  wallet.readyState === WalletReadyState.Installed
                    ? connect(wallet.name)
                    : window.open(wallet.url, "_blank")
                }
                className={cn(
                  "flex flex-row items-center space-x-3 rounded border border-opacity-25 bg-zinc-700 px-3 py-2.5 transition hover:cursor-pointer",
                  wallet.readyState === WalletReadyState.Installed
                    ? "border-zinc-500 hover:bg-zinc-600"
                    : "border-blue-500 bg-blue-500 bg-opacity-5 text-blue-500 hover:bg-opacity-10"
                )}>
                <Image src={wallet.icon} alt={wallet.name} width={26} height={26} />
                <p>
                  {wallet.readyState === WalletReadyState.Installed ? wallet.name : `Install ${wallet.name}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
