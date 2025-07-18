import i18n from "@/i18n";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import { imageLoader } from "@/components/utils";

export default function HomeSpecialRock() {
  const [t] = useTranslation();
  const [SpecialRock, setSpecialRock] = useState([]);
  const [hasData , sethasData] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${process.env.SERVER_LINK}/api/uniqueRock/lang?lang=${i18n.language}&limit=1`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setSpecialRock(res.data);
      sethasData(true);
    });
  }, []);
  return (
    <div className={hasData ? "second" : "second dis-none"}>
      {SpecialRock?.data?.map((data, i) => {
        return (
          <Row key={i}>
            <Col lg={1} className="p-0"></Col>
            <Col lg={11} className="SpecialRockOuterCN">
              <Row className="SpecialRockCN">
                <Col lg={4}>
                  <AnimationOnScroll animateIn="animate__fadeInDownBig " animateOnce={true}>
                    <div className="SpecialRockImage">
                      <div className="SpecialRockImageShape1"></div>
                      <Image loading="eager" width={500} height={1000} src={data.Image.url} alt={data.Image.alt} />
                      <div className="SpecialRockImageShape2">
                        <Image loading="eager" width={100} height={100} src={"/assets/static/ImgTheme.png"} alt="Rock theme" loader={imageLoader}/>
                      </div>
                    </div>
                  </AnimationOnScroll>
                </Col>
                <Col lg={1}></Col>
                <Col lg={7}>
                  <AnimationOnScroll animateIn="animate__fadeInUp  " animateOnce={true} delay={400}>
                    <h2 className="SpecialRockTitle">{data.title}</h2>
                    <div className="SpecialRockDescription">{data.text}</div>
                    <div className="CeoLink">
                      <Link href={`/UniqueRockOrder/${data.id}`}>{t("orderNow")}</Link>
                    </div>
                  </AnimationOnScroll>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
