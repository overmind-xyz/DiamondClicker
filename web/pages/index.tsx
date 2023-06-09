import { Dialog, DialogContent } from "@/components/Dialog";
import Wallet from "@/components/Wallet";
import { cn } from "@/lib/cn";
import { CONTRACT_ADDRESS, aptosClient } from "@/lib/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Types } from "aptos";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { account, wallet, signAndSubmitTransaction } = useWallet();
  const [walletDialog, setWalletDialog] = useState(false);
  const [upgradeAmount, setUpgradeAmount] = useState("" as number | "");

  const getDiamondsQuery = useQuery({
    queryKey: ["getDiamonds", account?.address],
    queryFn: async () => {
      return await aptosClient.view({
        arguments: [account?.address || ""],
        function: `${CONTRACT_ADDRESS}::game::get_diamonds`,
        type_arguments: [],
      });
    },
  });

  const diamonds =
    getDiamondsQuery && getDiamondsQuery.data && getDiamondsQuery.data[0]
      ? Number(getDiamondsQuery.data[0])
      : 0;

  const getDiamondsPerMinuteQuery = useQuery({
    queryKey: ["getDiamondsPerMinute", account?.address],
    queryFn: async () => {
      return await aptosClient.view({
        arguments: [account?.address || ""],
        function: `${CONTRACT_ADDRESS}::game::get_diamonds_per_minute`,
        type_arguments: [],
      });
    },
  });

  const diamondsPerMinute =
    getDiamondsPerMinuteQuery && getDiamondsPerMinuteQuery.data && getDiamondsPerMinuteQuery.data[0]
      ? Number(getDiamondsPerMinuteQuery.data[0])
      : 0;

  const getPowerupsQuery = useQuery({
    queryKey: ["getPowerups", account?.address],
    queryFn: async () => {
      return await aptosClient.view({
        arguments: [account?.address || ""],
        function: `${CONTRACT_ADDRESS}::game::get_powerups`,
        type_arguments: [],
      });
    },
  });

  const powerups =
    getPowerupsQuery && getPowerupsQuery.data && getPowerupsQuery.data[0]
      ? (getPowerupsQuery.data[0] as { amount: number; name: string }[])
      : null;

  const bruhPowerupsAmount =
    powerups && powerups.filter((powerup) => powerup.name === "0x42727568")[0]?.amount;

  const aptomingosPowerupsAmount =
    powerups && powerups.filter((powerup) => powerup.name === "0x4170746f6d696e676f73")[0]?.amount;

  const aptosMonkeysPowerupsAmount =
    powerups && powerups.filter((powerup) => powerup.name === "0x4170746f73204d6f6e6b657973")[0]?.amount;

  const handleDiamondClickTx = async () => {
    try {
      if (account?.address || account?.publicKey) {
        const payload: Types.TransactionPayload = {
          type: "",
          function: `${CONTRACT_ADDRESS}::game::click`,
          type_arguments: [],
          arguments: [],
        };
        const transactionRes = await signAndSubmitTransaction(payload);
        await aptosClient.waitForTransaction((transactionRes as any)?.hash || "");
        getDiamondsQuery.refetch();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleUpgradeTx = async (upgrade_index: number) => {
    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::game::upgrade`,
        type_arguments: [],
        arguments: [upgrade_index, typeof upgradeAmount == "number" ? upgradeAmount : 1],
      };
      const transactionRes = await signAndSubmitTransaction(payload);
      await aptosClient.waitForTransaction(transactionRes?.hash || "");
      setUpgradeAmount("");
      getDiamondsQuery.refetch();
      getPowerupsQuery.refetch();
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getDiamondsQuery.refetch();
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head>
        <title>Diamond Clicker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog open={walletDialog} onOpenChange={setWalletDialog}>
        <DialogContent
          title={account ? "Wallet" : "Connect wallet"}
          className="w-full overflow-hidden bg-zinc-800">
          <Wallet />
        </DialogContent>
      </Dialog>

      <div className="flex h-16 w-full flex-row items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6">
        <Link href="/" className="hidden text-lg font-medium sm:block">
          <span className="text-[#6FBFFF]">Diamond</span>Clicker.com
        </Link>

        {wallet && account && account.address && account.publicKey ? (
          <button
            onClick={() => setWalletDialog(true)}
            className="flex flex-row items-center justify-center space-x-3 rounded-full bg-zinc-800 px-6 py-2 text-sm hover:bg-zinc-700">
            <Image src={wallet.icon} alt={wallet.name} width={26} height={26} />
            <p>{account.address.slice(0, 6) + " ... " + account.address.slice(-6)}</p>
          </button>
        ) : (
          <button
            onClick={() => setWalletDialog(true)}
            className="rounded-full bg-zinc-800 px-6 py-2 text-sm hover:bg-zinc-700">
            Connect Wallet
          </button>
        )}
      </div>

      <main className="flex flex-col space-y-12 p-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex w-full max-w-2xl flex-col items-center justify-center space-y-4 py-6">
            <p className="px-6 text-xs font-medium text-zinc-500">Your Diamonds</p>

            <div className="flex w-full flex-col space-y-2 bg-zinc-700 bg-opacity-30 px-3 py-4">
              <p className="text-2xl font-bold">
                <span className="pr-1">💎</span> {diamonds.toLocaleString()}
              </p>
            </div>
            <p className="w-full text-right text-sm font-bold">
              {diamondsPerMinute} <span className="font-light">per minute</span>
            </p>
          </div>

          <div className="flex w-full max-w-xl flex-col items-center justify-center">
            <button
              onClick={() => handleDiamondClickTx()}
              className="text-[256px] transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:transition active:scale-90">
              💎
            </button>
            <div className="-mt-3 flex w-full flex-col items-center justify-center">
              <div className="h-16 w-3/4 border-l-[3px] border-r-[3px] border-t-[3px] border-zinc-700 bg-slate-500 bg-opacity-5" />
              <div className="h-24 w-full border-[3px] border-zinc-700 bg-slate-500 bg-opacity-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 justify-center p-6">
          <div className="flex h-min w-full max-w-xl flex-col items-center space-y-6 rounded-3xl bg-zinc-800 px-12 pt-9 pb-12">
            <p className="text-sm font-medium uppercase">Store</p>
            <div className="flex w-full flex-col space-y-3">
              <input
                className="border;border-zinc-700 w-full rounded-xl border border-transparent bg-zinc-900 px-4 py-3 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-0"
                type="number"
                value={upgradeAmount}
                onChange={(e) => setUpgradeAmount(parseInt(e.target.value))}
                placeholder="Upgrade amount"
              />
              <div className="flex flex-row sm:space-x-3">
                <button
                  onClick={() => setUpgradeAmount("")}
                  className="hidden h-10 flex-1 rounded-xl bg-zinc-700 hover:bg-zinc-600 sm:block">
                  Clear
                </button>
                <button
                  onClick={() => setUpgradeAmount((upgradeAmount) => (upgradeAmount ? upgradeAmount + 1 : 1))}
                  className="hidden h-10 flex-1 rounded-xl bg-zinc-700 hover:bg-zinc-600 sm:block">
                  +1
                </button>
                <button
                  onClick={() =>
                    setUpgradeAmount((upgradeAmount) => (upgradeAmount ? upgradeAmount + 10 : 10))
                  }
                  className="hidden h-10 flex-1 rounded-xl bg-zinc-700 hover:bg-zinc-600 sm:block">
                  +10
                </button>
                <button
                  onClick={() =>
                    setUpgradeAmount((upgradeAmount) => (upgradeAmount ? upgradeAmount + 100 : 100))
                  }
                  className="hidden h-10 flex-1 rounded-xl bg-zinc-700 hover:bg-zinc-600 lg:block">
                  +100
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                (typeof upgradeAmount === "number" ? upgradeAmount * 5 : 5) < diamonds && handleUpgradeTx(0)
              }
              className={cn(
                "flex w-full flex-row items-center justify-between space-x-6 rounded-xl bg-zinc-700 px-6 py-4",
                (typeof upgradeAmount === "number" ? upgradeAmount * 5 : 5) > diamonds
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-zinc-600"
              )}>
              <div className="flex flex-row items-center text-left sm:space-x-4">
                <Image
                  className="hidden aspect-square h-12 w-12 rounded-full sm:block"
                  src="/upgrades/0.png"
                  alt="Bruh"
                  height={48}
                  width={48}
                />
                <div className="flex flex-col">
                  <p className="hidden text-base font-bold sm:block lg:text-lg">Bruh</p>
                  <div className="flex flex-row items-center justify-start space-x-2">
                    {typeof upgradeAmount === "number" && upgradeAmount > 1 && (
                      <p className="text-xs font-bold text-yellow-100 lg:text-sm">
                        x{upgradeAmount.toLocaleString()}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-xs font-bold text-green-500 lg:text-sm",
                        (typeof upgradeAmount === "number" ? upgradeAmount * 5 : 5) > diamonds &&
                          "text-red-500"
                      )}>
                      💎{" "}
                      {upgradeAmount !== "" && upgradeAmount > 0 ? (upgradeAmount * 5).toLocaleString() : 5}
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-bold">{bruhPowerupsAmount ?? 0}</p>
            </button>

            <button
              onClick={() =>
                (typeof upgradeAmount === "number" ? upgradeAmount * 25 : 25) < diamonds && handleUpgradeTx(1)
              }
              className={cn(
                "flex w-full flex-row items-center justify-between space-x-6 rounded-xl bg-zinc-700 px-6 py-4",
                (typeof upgradeAmount === "number" ? upgradeAmount * 25 : 25) > diamonds
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-zinc-600"
              )}>
              <div className="flex flex-row items-center text-left sm:space-x-4">
                <Image
                  className="hidden aspect-square h-12 w-12 rounded-full sm:block"
                  src="/upgrades/1.png"
                  alt="Aptomingos"
                  height={48}
                  width={48}
                />
                <div className="flex flex-col">
                  <p className="hidden text-base font-bold sm:block lg:text-lg">Aptomingos</p>
                  <div className="flex flex-row items-center justify-start space-x-2">
                    {typeof upgradeAmount === "number" && upgradeAmount > 1 && (
                      <p className="text-xs font-bold text-yellow-100 lg:text-sm">
                        x{upgradeAmount.toLocaleString()}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-xs font-bold text-green-500 lg:text-sm",
                        (typeof upgradeAmount === "number" ? upgradeAmount * 25 : 25) > diamonds &&
                          "text-red-500"
                      )}>
                      💎{" "}
                      {upgradeAmount !== "" && upgradeAmount > 0 ? (upgradeAmount * 25).toLocaleString() : 25}
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-bold">{aptomingosPowerupsAmount ?? 0}</p>
            </button>

            <button
              onClick={() =>
                (typeof upgradeAmount === "number" ? upgradeAmount * 250 : 250) < diamonds &&
                handleUpgradeTx(2)
              }
              className={cn(
                "flex w-full flex-row items-center justify-between space-x-6 rounded-xl bg-zinc-700 px-6 py-4",
                (typeof upgradeAmount === "number" ? upgradeAmount * 250 : 250) > diamonds
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-zinc-600"
              )}>
              <div className="flex flex-row items-center text-left sm:space-x-4">
                <Image
                  className="hidden aspect-square h-12 w-12 rounded-full sm:block"
                  src="/upgrades/2.png"
                  alt="Aptos Monkeys"
                  height={48}
                  width={48}
                />
                <div className="flex flex-col">
                  <p className="hidden text-base font-bold sm:block lg:text-lg">Aptos Monkeys</p>
                  <div className="flex flex-row items-center justify-start space-x-2">
                    {typeof upgradeAmount === "number" && upgradeAmount > 1 && (
                      <p className="text-xs font-bold text-yellow-100 lg:text-sm">
                        x{upgradeAmount.toLocaleString()}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-xs font-bold text-green-500 lg:text-sm",
                        (typeof upgradeAmount === "number" ? upgradeAmount * 250 : 250) > diamonds &&
                          "text-red-500"
                      )}>
                      💎{" "}
                      {upgradeAmount !== "" && upgradeAmount > 0
                        ? (upgradeAmount * 250).toLocaleString()
                        : 250}
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-bold">{aptosMonkeysPowerupsAmount ?? 0}</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
