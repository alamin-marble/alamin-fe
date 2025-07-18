import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function HomeMedia({locale}) {
  const [t] = useTranslation();
  const [Blog, setBlog] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.SERVER_LINK}/api/mediaCenter/lang/?lang=${i18n.language}&mediaCategoryID=2&flag=1&limit=2`
      )
      .then((res) => {
        //const emps = res.data;
        //this.setState({ emps });
        setBlog(res.data);
      });
  }, []);

  function truncate(str) {
    return str.length > 250 ? str.slice(0, 250 - 1) + "..." : str;
  }
 
  return (
    <div className="HomeMediaCN">
      <Row>
        <Col lg={1}></Col>
        <Col lg={11}>
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
            <div className="HomeMediaTitle"> {t("mediaCenter")} </div>
          </AnimationOnScroll>
        </Col>
      </Row>
      <div className="MediaDirection">
        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          animateOnce={true}
          delay={400}
        >
          {Blog?.data?.map((data, i) => {
            return (
              <Row key={i}>
                <Col lg={7}>
                  <div className="HomeMediaImage">
                    <Image loading="eager" width={300} height={300} src={data.Image.url} alt={data.Image.alt} />
                  </div>
                </Col>
                <Col lg={1}></Col>
                <Col lg={4}>
                  <div className="HomeMediaInfo">
                    <h3 className="HomeMediaInnerTitle">{data.title}</h3>
                    <div className="HomeMediaDesc">
                 
                      <div dangerouslySetInnerHTML={{ __html: truncate(data.description) }} />
                    </div>
                    <div className="CeoLink">
                      <Link href={`/BlogDetails/${data.slug}/${data.id}`}>
                        {t("moreDetails")}
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </AnimationOnScroll>
      </div>
    </div>
  );
}
