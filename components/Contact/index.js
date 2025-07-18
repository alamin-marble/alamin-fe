import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import "../../../";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContactInfo from "./Sections/ContactInfo";
import ContactForm from "./Sections/ContactForm";
import ContactMap from "./Sections/ContactMap";
import { useEffect } from "react";
import Meta from "../../Others/Meta";
export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="webPageCn">
      <Meta MetaPage="contact" />
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="HomeMediaTitle AboutPad">اتصل بنا</div>

          <div className="ContactCN">
            <Row className="m-0">
              <Col lg={5} className="p-0">
                <div>
                  <ContactInfo />
                </div>
                <div>
                  <div className="VisionMissionTitle">
                    قم بتعبئة النموذج، وسنتواصل معك بأقرب وقت
                  </div>
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
