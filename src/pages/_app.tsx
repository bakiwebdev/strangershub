import Header from "@/components/header";
import "@/styles/globals.css";
import Loglib from "@loglib/tracker/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Script from "next/script";
import "tippy.js/dist/tippy.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import { store } from "@/store";
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Loglib
        config={{
          id: "www_strangershub",
          host: "https://www.loglib.io",
        }}
      />

      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <Provider store={store}>
            <Header />
            <Component {...pageProps} />
            {/* <Footer /> */}
          </Provider>
        </AnimatePresence>
      </QueryClientProvider>
    </>
  );
}
