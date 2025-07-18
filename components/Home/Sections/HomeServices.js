import i18n from "@/i18n";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";

export default function HomeServices() {
  const [t] = useTranslation();
  const [Services, setServices] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/services/lang?lang=${i18n.language}`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setServices(res.data);
    });
  }, []);

  return (
    <div className="ServicesCN">
      <div className="ServicesCN-Inner">
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true} delay={200}>
          <Row>
            <Col lg={1} className="p-0"></Col>
            <Col lg={11} className="p-0">
              <h2 className="ServicesTitle">{t("homeServicesTitle")}</h2>
            </Col>
          </Row>

          <Row>
            <Col lg={1} className="p-0"></Col>
            <Col lg={3} className="p-0">
              <div className="ServicesSubtitle-CN">
                <div className="ServicesSubtitle">{t("homeServicesDesc")}</div>
                <div className="CeoLink">
                  <Link href="/Consulting">{t("reserve")} </Link>
                </div>
              </div>
            </Col>
            <Col lg={1} className="p-0"></Col>
            <Col lg={7} className="p-0">
              <div className="ServicesIconsCN">
                {Services?.data?.map((data, i) => {
                  return (
                    <div className="ServicesInfo" key={i}>
                      <div className="ServicesIcon">
                        <Image loading="eager" width={45} height={45} src={data.Image.url} alt={data.Image.alt} />{" "}
                      </div>
                      <div className="ServicesName">{data.title}</div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>
      </div>
    </div>
  );
}
