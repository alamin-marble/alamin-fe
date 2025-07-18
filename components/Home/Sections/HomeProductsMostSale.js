import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { useState, useEffect } from "react";
import axios from "axios";
import Fancybox from "../../Others/Fancybox.js";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function HomeProductsMostSale({ productsData }) {
  const [t] = useTranslation();
  const [ProductData, setProductData] = useState();
  useEffect(() => {
    setProductData(productsData);
  }, [productsData]);

  return (
    <div className="HomeProductSlider">
      <Fancybox>
        <Row>
          <Col lg={1} className="p-0"></Col>
          <Col lg={11} className="p-0">
            <AnimationOnScroll
              animateIn="animate__slideInRight"
              animateOnce={true}
            >
              <h2 className="ProductSliderTitle">{t("mostSellingTitle")} </h2>
              <div className="ProductSliderSubTitle">
              {t("mostSellingSubTitle")} 
              </div>
            </AnimationOnScroll>
            <>
              <AnimationOnScroll
                animateIn="animate__slideInLeft"
                animateOnce={true}
                delay={700}
              >
                <Swiper
                  slidesPerView={3}
                  spaceBetween={80}
                  loop={false}
                  navigation
                  speed={1000}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    200: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 80,
                    },
                  }}
                  modules={[Autoplay, Navigation]}
                  className="mySwiper MyProductSlider"
                >
                  {!!ProductData?.data?.length &&
                    ProductData?.data?.map((data, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="ProductSliderInfo">
                            <div className="ProductMask">
                              <div className="ProductShape"></div>
                              <div className="ProductShape2">
                                  <div
                                    key={i}
                                    data-fancybox="ProductsMostSale"
                                    data-caption={i18n.language === "ar" ? data.title : data.titleEn}  
                                    href={data?.colors[0]?.imageID[0]?.image?.url}
                                  >
                                    {" "}
                                    <Image
                                      loading="eager"
                                      width={100}
                                      height={100}
                                      src={data?.colors[0]?.imageID[0]?.image?.url}
                                      alt={data?.colors[0]?.imageID[0]?.image?.alt}
                                    />{" "}
                                  </div>
                              </div>
                            </div>
                            <div className="ProductColor">
                              {" "}
                              {i18n.language === "ar" ? data?.colors[0].color : data?.colors[0].colorEn}{" "}
                            </div>
                            <div className="ProductDevider">-</div>
                            <div className="ProductCountry">
                            {i18n.language === "ar" ? data.Country_title : data.Country_titleEn}
                            </div>
                            <div className="ProductType">{i18n.language === "ar" ? data.title : data.titleEn}</div>
                            <div className="CeoLink">
                              <Link href={`/ProductsDetails/${data.slug}/${data.id}`}>
                              {t("orderNow")} 
                              </Link>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}

                  <div className="clear"></div>
                </Swiper>
              </AnimationOnScroll>
            </>
          </Col>
          <div className="clear"></div>
        </Row>
        <div className="clear"></div>
      </Fancybox>
    </div>
  );
}
