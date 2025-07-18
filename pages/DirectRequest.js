import axios from "axios";
import { useEffect } from "react";
import DirectRequestForm from "../components/DirectRequest/Sections/DirectRequestForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/nav";
import Meta from "../components/Others/Meta";
import { useTranslation } from "react-i18next";

export default function DirectRequest({ MetaData }) {
  const [t] = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="webPageCn">
      <Meta MetaData={MetaData} />
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad">{t("directRequest")} </div>
            <div className="HomeMediaDesc">
            {t("consultationText")}
            </div>

            <DirectRequestForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({locale}) => {
  try {
    const MetaResponse = await axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=consultation`);
    const MetaData = MetaResponse.data;

    return {
      props: {
        MetaData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
