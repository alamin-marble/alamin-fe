import axios from "axios";
import i18next from "i18next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
export default function HomeSlider({ sliderData }) {
  const [SliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    setSliderImages(sliderData);
  }, [sliderData]);

  return (
    <>
      {!!SliderImages?.data?.length && (
        <Swiper
          direction={"vertical"}
          loop={true}
          pagination={{ clickable: true }}
          speed={1000}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {SliderImages.data.map((data, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  loading="eager"
                  width={500}
                  height={500}
                  src={data.Image.url}
                  alt={data.Image.alt}
                  priority={true}
                />
                <div className="SwiperData">
                  <div
                    className="SwiperSubTitle"
                    style={{ color: `${data.fontColor}` }}
                  >
                    {data.subtitle}
                  </div>
                  <div
                    className="SwiperTitle"
                    style={{ color: `${data.fontColor}` }}
                  >
                    {data.title}
                  </div>

                  <div className="SwiperLinksCN">
                    <div className="SwiperLink1">
                      <Link
                        href={
                          data.btn1Link || `${process.env.SERVER_LINK}/Products`
                        }
                        style={{
                          color: `${data.fontColor}`,
                          borderColor: `${data.fontColor}`,
                        }}
                      >
                        {data.btn1Text}
                      </Link>
                    </div>
                    <div className="SwiperLink2">
                      <Link
                        href={
                          data.btn2Link || `${process.env.SERVER_LINK}/Products`
                        }
                        style={{
                          color: `${data.fontColor}`,
                          borderColor: `${data.fontColor}`,
                        }}
                      >
                        {data.btn2Text}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
