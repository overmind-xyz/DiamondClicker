import { WalletProvider } from "@/providers/WalletProvider";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}