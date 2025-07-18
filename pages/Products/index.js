import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/nav";
import Footer from "@/components/Footer";
import Fancybox from "@/components/Others/Fancybox";
import Link from "next/link";
import Pagination from "@/components/Others/Pagination";
import Meta from "@/components/Others/Meta";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Image from 'next/image';

export default function Products({ metaData }) {
  const [t] = useTranslation();
  const router = useRouter();
  const [hasData, sethasData] = useState(false);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(router.query)
  );

  var tempColorSearchParams = router.query.UrlColorID;
  var tempCountrySearchParams = router.query.UrlCountryID;
  var tempTypeSearchParams = router.query.UrlTypeID;
  let [tempUrlColorID, settempUrlColorID] = useState(tempColorSearchParams);
  let [tempUrlCountryID, settempUrlCountryID] = useState(
    tempCountrySearchParams
  );
  let [tempUrlTypeID, settempUrlTypeID] = useState(tempTypeSearchParams);
  const [FormDataAttr, setFormDataAttr] = useState({
    limit: 2000,
    offset: 0,
    color_id: tempUrlColorID ? [tempUrlColorID] : [],
    country_id: tempUrlCountryID ? [tempUrlCountryID] : [],
    type_id: tempUrlTypeID ? [tempUrlTypeID] : [],
  });
  const [usedFilters, setusedFilters] = useState(false);

  const [ProductData, setProductData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentButton, setCurrentButton] = useState(1);
  const [postsPerPage] = useState(6);

  const [dataLength, setdataLength] = useState(1);
  const [howManyPages, sethowManyPages] = useState();

  const getData = useCallback(() => {
    axios
      .post(`${process.env.SERVER_LINK}/api/products/filter`, FormDataAttr)
      .then((res) => {
        setProductData(res.data);
        setdataLength(res.data.data.length);
        sethowManyPages(Math.ceil(res.data.data.length / postsPerPage));
      })
      .catch((err) => console.log("err", err));
  }, [FormDataAttr, postsPerPage]);

  useEffect(() => {
    getData();
  }, [FormDataAttr, howManyPages]);

  useEffect(() => {
    settempUrlColorID(tempColorSearchParams);
    settempUrlCountryID(tempCountrySearchParams);
    settempUrlTypeID(tempTypeSearchParams);
    setFormDataAttr({
      limit: 2000,
      offset: 0,
      color_id: tempColorSearchParams ? [tempUrlColorID] : [],
      country_id: tempCountrySearchParams ? [tempUrlCountryID] : [],
      type_id: tempTypeSearchParams ? [tempUrlTypeID] : [],
    });
  }, [
    tempColorSearchParams,
    tempUrlColorID,
    tempCountrySearchParams,
    tempUrlCountryID,
    tempTypeSearchParams,
    tempUrlTypeID,
  ]);

  function TypeFilterSet(e) {
    setusedFilters(true);

    let InnerTypeArray = [];

    if (!!FormDataAttr?.type_id) {
      InnerTypeArray = [...FormDataAttr.type_id];
    } else {
      InnerTypeArray = [];
    }

    const newTypeyId = e.target.value;
    if (!InnerTypeArray.includes(newTypeyId)) {
      InnerTypeArray.push(newTypeyId.toString());
    } else {
      InnerTypeArray.splice(InnerTypeArray.indexOf(newTypeyId), 1);
    }
    let tempTyperArray = InnerTypeArray;
    setFormDataAttr({ limit: 2000, offset: 0, type_id: tempTyperArray });

    sethowManyPages(Math.ceil(dataLength / postsPerPage));
    setCurrentPage(1);
    setCurrentButton(1);
  }

  function CountryFilterSet(e) {
    setusedFilters(true);
    let InnerCountryArray = [];

    if (!!FormDataAttr?.country_id) {
      InnerCountryArray = [...FormDataAttr.country_id];
    } else {
      InnerCountryArray = [];
    }

    const newCountryId = e.target.value;
    if (!InnerCountryArray.includes(newCountryId)) {
      InnerCountryArray.push(newCountryId.toString());
    } else {
      InnerCountryArray.splice(InnerCountryArray.indexOf(newCountryId), 1);
    }
    let tempCountryrArray = InnerCountryArray;

    setFormDataAttr({ limit: 2000, offset: 0, country_id: tempCountryrArray });
    sethowManyPages(Math.ceil(dataLength / postsPerPage));
    setCurrentPage(1);
    setCurrentButton(1);
  }

  function ColorFilterSet(e) {
    setusedFilters(true);

    var elems = document.querySelectorAll(".ColorBox");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    const InnerColorArray = [];
    const newId = e.currentTarget.getAttribute("value"); //new id
    if (!InnerColorArray.includes(newId)) {
      //checking weather array contain the id
      InnerColorArray.push(newId); //adding to array because value doesnt exists
    } else {
      InnerColorArray.splice(InnerColorArray.indexOf(newId), 1); //deleting
    }
    let tempColorArray = InnerColorArray;
    setFormDataAttr({ ...FormDataAttr, color_id: tempColorArray });
    sethowManyPages(Math.ceil(dataLength / postsPerPage));
    setCurrentPage(1);
    setCurrentButton(1);
  }

  function clearFilter() {
    setusedFilters(true);
    searchParams.delete("UrlCountryID");
    searchParams.delete("UrlTypeID");
    searchParams.delete("UrlColorID");
    setSearchParams(searchParams);
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] != null) {
        if (inputs[i].checked) {
          inputs[i].checked = false;
        }
      }
    }

    setFormDataAttr({ limit: 2000, offset: 0 });
    ToggleFilter();
  }

  const [CountryInfo, setCountryInfo] = useState([]);
  const [isActive, setActive] = useState("false");
  const ToggleFilter = () => {
    setActive(!isActive);
    document.body.classList.toggle("modal-open");
  };

  const [ColorInfo, setColorInfo] = useState([]);
  const [FilterTypeInfo, setFilterTypeInfo] = useState([]);
  const [ProductCountryNameDesc, setProductCountryNameDesc] = useState([]);


  const [FilterTypeLoading, setFilterTypeLoading] = useState("false");


  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${process.env.SERVER_LINK}/api/colors`)
      .then((res) => {
        setColorInfo(res.data);
      })
      .catch((err) => console.log("err", err));

    axios
      .get(`${process.env.SERVER_LINK}/api/productTypes`)
      .then((res) => {
        setFilterTypeInfo(res.data);
        setFilterTypeLoading(true);
      })
      .catch((err) => console.log("err", err));

    axios
      .get(`${process.env.SERVER_LINK}/api/productsCountry`)
      .then((res) => {
        setCountryInfo(res.data);
      })
      .catch((err) => console.log("err", err));


      console.log(FilterTypeLoading)
    let url = window.location.href;
    if (url.includes("?UrlCountryID")) {
      setTimeout(() => {
        if (`FilterCountry${tempCountrySearchParams}` != null) {
          try {
            document.getElementById(`FilterCountry${tempCountrySearchParams}`).checked = true;
          } catch (error) {
            console.error(error);
          }
          
        }
      }, 1500);

      axios
        .get(
          `${process.env.SERVER_LINK}/api/productsCountry/${tempCountrySearchParams}`
        )
        .then((res) => {
          if (res.status === 200) {
            setProductCountryNameDesc(res.data);
            sethasData(true);
            //console.log(res.data)
          } else {
            //console.log("failed")
            sethasData(false);
          }
        })
        .catch((err) => console.log("err", err));
    }

   
      if (url.includes("?UrlTypeID")) {
 
        setTimeout(() => {
          if (`FilterType${tempTypeSearchParams}` != null) {
            try {
              document.getElementById(`FilterType${tempTypeSearchParams}`).checked = true;
            } catch (error) {
              console.error(error);
            }
          }
        }, 1500);
     
    }
   
     
   
 


    if (url.includes("?UrlColorID")) {
      setTimeout(() => {
        var elems = document.querySelectorAll(".ColorBox");

        [].forEach.call(elems, function (el) {
          el.classList.remove("active");
        });
        var currentElement = document.querySelector(
          `[data-target="Color${tempColorSearchParams}"]`
        );
        if (currentElement) {
          currentElement.classList.add("active");
        }
      }, 1500);
    }
  }, [tempUrlCountryID , FilterTypeLoading]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ProductData?.data?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="webPageCn">
      <Meta MetaPage="products" MetaData={metaData} />
      <Navbar InPage="Products" />

      <section>
        <div className="ProductsCN">
          <Row className="m-0">
            <div className="HomeMediaTitle">
              {" "}
              {t("ourProducts")}
              <span className={usedFilters ? "dis-none" : ""}>
                {" "}
                {hasData ? `| ${i18n.language === "ar" ?  ProductCountryNameDesc?.title : ProductCountryNameDesc?.titleEn}` : ""}
                {" "}
              </span>
            </div>

           
            <div className={usedFilters ? "HomeMediaDesc dis-none" : "HomeMediaDesc"}>
              {" "}
              {hasData && ProductCountryNameDesc?.description && ProductCountryNameDesc?.descriptionEn ? `${i18n.language === "ar" ?  ProductCountryNameDesc?.description : ProductCountryNameDesc?.descriptionEn}` : ""}
              {" "}
            </div>
           

          </Row>

          <Row className="m-0">
            <Col lg={4} className="p-0">
              <div className="FiltersCN">
                <button className="filters-btn" onClick={ToggleFilter}>
                  <span className="filters-btn__filter_text">{t("filtersText")}</span>
                  <svg
                    aria-hidden="true"
                    className="icon-filter-ds"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M21 8.25H10m-5.25 0H3"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M3 15.75h10.75m5 0H21"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ripple"></span>
                </button>

                <div
                  className={
                    isActive ? "FilterInner" : "FilterInner FilterInnerOpen"
                  }
                >
                  <div className="FilterPane">
                    <div className="ProductsWithBtn">
                      <div className="FilterTitle">{t("filters")}</div>
                      <div className="CloseBTN" onClick={ToggleFilter}>
                        <svg
                          height="15px"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 512 512"
                          width="512px"
                          xmlSpace="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                        </svg>
                      </div>
                    </div>

                    <Accordion
                      defaultActiveKey={["0", "1", "2", "3", "4"]}
                      alwaysOpen
                    >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="FilterSubtitle">{t("FilterCountry")}</div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="filters-checkboxes-btns">
                            <ul>
                              {CountryInfo.map((data, i) => {
                                return (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={`FilterCountry` + data.id}
                                      name="Source[]"
                                      value={data.id}
                                      onClick={CountryFilterSet}
                                    />
                                    <label htmlFor={`FilterCountry` + data.id}>
                                      {i18n.language === "ar" ?  data?.country : data?.countryEn}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <div className="FilterSubtitle">{t("color")}</div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="FilterColorBox">
                            {/* <div className='ColorBox  active clearFilter' style={{backgroundColor:`#fff`}} onClick={clearFilter}></div>  */}
                            {ColorInfo.map((data, i) => {
                              return (
                                <div
                                  key={i}
                                  data-value={`${data.id}`}
                                  data-target={`Color${data.id}`}
                                  value={`${data.id}`}
                                  onClick={ColorFilterSet}
                                  className={
                                    i === 0 ? "ColorBox  " : "ColorBox "
                                  }
                                  style={{ backgroundColor: `${data.hexCode}` }}
                                ></div>
                              );
                            })}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <div className="FilterSubtitle">{t("marbleType")}</div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="filters-checkboxes-btns">
                            <ul>
                              {FilterTypeInfo.map((data, i) => {
                                return (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={`FilterType` + data.id}
                                      name="Source[]"
                                      value={`${data.id}`}
                                      onClick={TypeFilterSet}
                                    />
                                    <label htmlFor={`FilterType` + data.id}>
                                     {i18n.language === "ar" ?  data?.title : data?.titleEn}
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <div className="FilterSubmitBtn">
                      <button onClick={clearFilter}>{t("reset")}</button>
                      <button onClick={ToggleFilter}>{t("apply")}</button>
                    </div>

                    <button onClick={clearFilter} className="ResetBtn">
                      {t("resetFilters")}
                    </button>
                  </div>
                </div>
              </div>
            </Col>
             
            <Col lg={8} className="p-0">
              <div className="ProductsContainer">
                <Fancybox>
                  <Row className="m-0">
                    {ProductData?.data?.length ? (
                      currentPosts?.slice(0).map((data, i) => {
                        return (
                          <Col lg={4} sm={4} xs={6} className="p-0" key={i}>
                            <div className="ProductSliderInfo text-center ProductPageInnerInfo">
                              <div className="ProductMask">
                                <div className="ProductShape"></div>
                                <div className="ProductShape2">
                                  <div
                                    key={i}
                                    data-fancybox="ProductsMostSale"
                                    data-caption={i18n.language === "ar" ? data.title : data.titleEn}  
                                    href={
                                      data?.colors[0]?.imageID[0]?.image?.url
                                    }
                                  >
                                    {" "}
                                    <Image
                                      loading="eager"
                                      width={300}
                                      height={300}
                                      src={
                                        data?.colors[0]?.imageID[0]?.image?.url
                                      }
                                      alt="rokham"
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
                      <p className="HomeMediaInnerTitle p-0 m-0">
                        {t("noProducts")}
                      </p>
                    )}

                    {ProductData?.data?.length ? (
                      ProductData?.data?.length >= postsPerPage ? (
                        <Pagination
                          pages={howManyPages}
                          setCurrentPage={setCurrentPage}
                          setCurrentButton={setCurrentButton}
                          currentButton={currentButton}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </Row>
                </Fancybox>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ query , locale }) => {
  try {
    const [metaRes] = await Promise.all([
      axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=products`),
    ]);
    const metaData = metaRes.data;
    return {
      props: {
        metaData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        metaData: null,
      },
    };
  }
};
