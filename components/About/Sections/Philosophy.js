import axios from "axios";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { imageLoader } from "@/components/utils";

export default function Philosophy() {
  const [t] = useTranslation();
  const [IntroDetails, setIntroDetails] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/about/lang?lang=${i18n.language}&offset=0&limit=10`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setIntroDetails(res.data);
    });
  }, []);

  return (
    <>
      {IntroDetails?.data?.map((data, i) => {
        return (
          <Row className="m-0 align-items-center " key={i}>
            <Col lg="5" className="p-0 order-res-2">
              <div className="PhilosophyTitle">{t("philosophy")}</div>
              <div className="PhilosophySubTitle">{t("philosophyText")} </div>
              <div className="PhilosophyDescription">{data.philosophy}</div>
            </Col>
            <Col lg="1" className="p-0"></Col>
            <Col lg="6" className="p-0 order-res-1">
              <div className="AboutIntroImg">
                <Image loading="eager" width={500} height={500} src={"/assets/static/philosophy.png"} alt="Intro" loader={imageLoader}/>
              </div>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
