import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Navbar from "../pages/components/navbar";

function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
