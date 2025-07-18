import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/nav";
import { useTranslation } from "react-i18next";
 
export default function ThankYou() {
  const [t] = useTranslation();
  return (
    <div>
      <Navbar InPage="Thanks" />

      <div className="ThankyouCN">
        {t("thankyouText1")}
        <br></br>
        <br></br>
        <b>{t("thankyouText2")}</b>
      </div>

      <Footer />
    </div>
  );
}
