import Header from "@/components/header";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import "tippy.js/dist/tippy.css";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {/* <Provider store={store}> */}
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
        {/* </Provider> */}
      </AnimatePresence>
    </QueryClientProvider>
  );
}
