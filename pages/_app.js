import "@/styles/app.css";
import "@/styles/globals.css";
import i18next from "i18next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppProvider } from "../contexts/AppContext";
import "../i18n.js";
import axios from "axios";
import https from "https";
import PageLoading from "@/components/Others/PageLoading";
export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const lang = router.locale;
    i18next.changeLanguage(lang || "ar");
    if (lang === "en") {
      document.getElementById("lngTop").setAttribute("dir", "ltr");
    } else {
      document.getElementById("lngTop").setAttribute("dir", "rtl");
    }
    setIsComplete(true);
  }, [router.locale]);

 

    axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    });


  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return <AppProvider>{!isLoading && isComplete ? <Component {...pageProps} /> : <PageLoading />}</AppProvider>;
}
