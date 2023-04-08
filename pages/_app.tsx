import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SkeletonTheme } from "react-loading-skeleton";
import { SWRConfig } from "swr";
import api from "@/adapters/axios";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url).then((res) => res.data),
      }}
    >
      <SessionProvider session={session}>
        <SkeletonTheme baseColor="#334155" highlightColor="#475569">
          <Component {...pageProps} />
        </SkeletonTheme>
      </SessionProvider>
    </SWRConfig>
  );
}
