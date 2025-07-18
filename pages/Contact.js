import axios from "axios";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContactForm from "../components/Contact/Sections/ContactForm";
import ContactInfo from "../components/Contact/Sections/ContactInfo";
import ContactMap from "../components/Contact/Sections/ContactMap";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/nav";
import Meta from "../components/Others/Meta";
import { useTranslation } from "react-i18next";

export default function Contact({ MetaData }) {
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
          <div className="HomeMediaTitle AboutPad">{t("contact")}</div>

          <div className="ContactCN">
            <Row className="m-0">
              <Col lg={5} className="p-0">
                <div>
                  <ContactInfo />
                </div>
                <div>
                  <div className="VisionMissionTitle">{t("contactFormText")}</div>
                  <ContactForm />
                </div>
              </Col>
              <Col lg={1} className="p-0"></Col>
              <Col lg={6} className="p-0">
                <ContactMap />
              </Col>
            </Row>
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
    const MetaResponse = await axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=contact`);
    const MetaData = MetaResponse.data;

    return {
      props: {
        MetaData,
      },
    };
  } catch (error) {
    console.log(error);
  };
  return {
    props,
  };
};
