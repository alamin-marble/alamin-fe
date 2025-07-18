import { useState, useEffect } from "react";
import axios from "axios";
import i18n from "@/i18n";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useTranslation } from "react-i18next";
export default function HomeCEO({ ceoData , locale}) {
  const [t] = useTranslation();
  const [CeoDetails, setCeoDetails] = useState([]);
 
  useEffect(() => {
    setCeoDetails(ceoData);
  }, [ceoData]);
 
  return (
    <div className="CEO-cn">
      <Row>
        <Col lg={1}></Col>

        <Col lg={6} sm={6} className="order-res-2">
          <AnimationOnScroll
            animateIn={i18n.language === "ar" ? "animate__fadeInRight" : "animate__fadeInLeft"}
            animateOnce={true}
          >
            <h1 className="CeoTitle">
            {t("alaminCompany")} 
            </h1>
            {CeoDetails?.data?.map((data, i) => {
              return (
                <div key={i}>
                  <div className="CeoDescription">{data.introduction}</div>
                </div>
              );
            })}

            <div className="CeoLink">
              <Link href="/About">{t("readMore")}  </Link>
            </div>
          </AnimationOnScroll>
        </Col>

        <Col lg={5} sm={5} className="order-res-1">
          <AnimationOnScroll animateIn={i18n.language === "ar" ? "animate__fadeInLeft" : "animate__fadeInRight"} animateOnce={true}>
            <div className="CeoMaskCN">
              <span></span>
              <div className="CeoMask">
                <div className="shape"></div>
                <div className="shape2">
                  {CeoDetails?.data?.map((data, i) => {
                    return (
                      <div key={i}>
                        <Image loading="eager" width={500} height={500} src={data.Image.url} alt={data.Image.alt}  />
                      </div>
                    );
                  })}
                </div>
              </div>
              <span></span>
            </div>
          </AnimationOnScroll>
        </Col>
      </Row>
    </div>
  );
}
