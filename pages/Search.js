import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "@/components/Navbar/nav";
import Fancybox from "@/components/Others/Fancybox";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Image from 'next/image';
export default function SearchPage({ searchData }) {
  const [t] = useTranslation();
 // var SearchQuery = SearchTerm;
  const [ProductData, setProductData] = useState();
 
  const getData = useCallback(() => {
    setProductData(searchData);
  }, [searchData]);
 console.log(searchData)
  useEffect(() => {
    getData();
 
  }, [getData]);
  // let FilterdResults = ProductData?.data.filter((res) =>
  //   Object.values(res).toString().includes(SearchQuery)
  // );
  return (
    <div className="webPageCn">
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad">{t("searchResult")}</div>

            <Fancybox>
              <Row className="m-0">
                {ProductData?.length ? (
                  ProductData.map((data, i) => {
                    return (
                      <Col lg={3} sm={4} xs={6} className="p-0" key={i}>
                        <div className="ProductSliderInfo text-center ProductPageInnerInfo">
                          <div className="ProductMask 555">
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
                                  width={500}
                                  height={500}
                                  src={data?.colors[0]?.imageID[0]?.image?.url}
                                  alt={data?.colors[0]?.imageID[0]?.image?.alt}
                                />{" "}
                              </div>
                            </div>
                          </div>
                          <div className="ProductColor">
                          
                            {i18n.language === "ar" ? data?.colors[0].color : data?.colors[0].colorEn}
                          </div>
                          <div className="ProductDevider">-</div>
                          <div className="ProductCountry">
                           {i18n.language === "ar" ? data.Country_title : data.Country_titleEn}{" "}
                          </div>
                          <div className="ProductType">{i18n.language === "ar" ? data.title : data.titleEn}  </div>
                          <div className="CeoLink">
                            <Link href={`/ProductsDetails/${data.slug}/${data.id}`}>
                              {t("moreDetails")}
                            </Link>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <p className="HomeMediaInnerTitle">{t("noSearchResult")} </p>
                )}
              </Row>
            </Fancybox>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export async function getServerSideProps({ query }) {
  try {
    const { SearchTerm } = query;
    let smallLetterSearchTerm = SearchTerm.toLowerCase();
    const searchRes = await axios.get(`${process.env.SERVER_LINK}/api/products/search/?q=${smallLetterSearchTerm}`);
    const searchData = searchRes.data;
    
    return {
      props: {
        searchData, 
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        searchData: [], 
      },
    };
  }
}
