import axios from "axios";
import { useEffect } from "react";
import Job from "../components/Careers/Sections/Job";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/nav";
import Meta from "../components/Others/Meta";
import { useTranslation } from "react-i18next";
export default function Careers({ MetaData }) {
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
            <div className="HomeMediaTitle AboutPad">{t("jobOpp")} </div>

            <Job />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({locale}) => {
   let props = {};
  try {
    const MetaResponse = await axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=careers`);
    const MetaData = MetaResponse.data;

    return {
      props: {
        MetaData,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props,
  };
};
