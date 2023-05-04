import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SkeletonTheme } from "react-loading-skeleton";
import { SWRConfig } from "swr";
import api from "@/adapters/axios";
import { useEffect, useState } from "react";
import SidebarModalContext from "@/contexts/SidebarModalContext";
import { SidebarModal } from "@/components/Sidebar";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const progressBar = new ProgressBar({
  color: "#22c55e",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [sidebarModalVisible, setSidebarModalVisible] = useState(false);
  function toggleSidebarModal() {
    setSidebarModalVisible((prev) => !prev);
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", progressBar.start);
    Router.events.on("routeChangeComplete", progressBar.finish);
    Router.events.on("routeChangeError", progressBar.finish);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="description" content="UTube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig
        value={{
          fetcher: (url: string) => api.get(url).then((res) => res.data),
        }}
      >
        <SessionProvider session={session}>
          <SkeletonTheme baseColor="#334155" highlightColor="#475569">
            <SidebarModalContext.Provider value={{ toggleSidebarModal }}>
              {getLayout(<Component {...pageProps} />)}
              {sidebarModalVisible && (
                <SidebarModal toggleSidebarModal={toggleSidebarModal} />
              )}
            </SidebarModalContext.Provider>
          </SkeletonTheme>
        </SessionProvider>
      </SWRConfig>
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}
