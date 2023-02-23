import Header from "@/components/header";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      {/* <Provider store={store}> */}
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
      {/* </Provider> */}
    </AnimatePresence>
  );
}
