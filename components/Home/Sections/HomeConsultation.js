import i18n from "@/i18n";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";

export default function HomeConsultation() {
  const [t] = useTranslation();
  const [Consultation, setConsultation] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/consultationHomeBanner/lang?lang=${i18n.language}`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setConsultation(res.data);
    });
  }, []);

  return (
    <div className="ConsultationCN">
      <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true} delay={200}>
        <Row>
          {Consultation?.data?.map((data, i) => {
            return (
              <Col lg={12} className="ConsultationInnerCN p-0" key={i}>
                <Image loading="eager" width={700} height={700} src={data.Image.url} className="ConsultingImage" alt={data.Image.alt} />
                <div className="ConsultationInfo">
                  <div className="ConsultationTitle">{data.text}</div>

                  <div className="ConsultationLink">
                    <Link href="/Consulting">{data.btnTxt}</Link>
                  </div>

                  <div className="ConsultationContactLink">
                    <Link href="/Contact"> {t("contact")} </Link>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </AnimationOnScroll>
    </div>
  );
}
