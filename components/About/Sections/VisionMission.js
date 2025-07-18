import axios from "axios";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { imageLoader } from "@/components/utils";

export default function VisionMission() {
  const [t] = useTranslation();
  const [VMDtails, setVMDtails] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/about/lang?lang=${i18n.language}&offset=0&limit=10`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setVMDtails(res.data);
    });
  }, []);

  return (
    <>
      {VMDtails?.data?.map((data, i) => {
        return (
          <Row className="m-0 align-items-center" key={i}>
            <Col lg="3" className="p-0">
              <div className="AboutIntroImg">
                <Image loading="eager" width={100} height={100} src={"/assets/static/vision-mission.png"} alt="Vision" loader={imageLoader}/>
              </div>
            </Col>
            <Col lg="1" className="p-0"></Col>
            <Col lg="6" className="p-0">
              <div className="VisionMissionTitle">{t("vision")}</div>
              <div className="AboutVisionMission">{data.vision}</div>
              <div className="VisionMissionTitle">{t("mission")}</div>
              <div className="AboutVisionMission">{data.mission}</div>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
