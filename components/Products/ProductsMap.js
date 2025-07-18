import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useEffect, useState } from "react";

import Fancybox from "../../Others/Fancybox";
import Link from "next/link";
import Image from 'next/image';
import Meta from "../../Others/Meta";

export default function Products() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const UrlColorID = urlParams.get("UrlColorID");

  const [FormDataAttr, setFormDataAttr] = useState({ limit: 20, offset: 0 });

  let InnerCountryArray = [];
  let InnerTypeArray = [];

  useEffect(() => {
    if (queryString.length > 1 && queryString[1] !== "") {
      let temp = UrlColorID;
      setFormDataAttr({ ...FormDataAttr, color_id: [temp] });
    }
  }, []);

  function TypeFilterSet(e) {
    if (!!FormDataAttr?.type_id) {
      InnerTypeArray = [...FormDataAttr.type_id];
    } else {
      InnerTypeArray = [];
    }

    const newTypeyId = e.target.value;
    if (!InnerTypeArray.includes(newTypeyId)) {
      InnerTypeArray.push(newTypeyId.toString());
      // console.log("push")
    } else {
      InnerTypeArray.splice(InnerTypeArray.indexOf(newTypeyId), 1);
      //console.log("splice")
    }
    let tempTyperArray = InnerTypeArray;
    setFormDataAttr({ limit: 20, offset: 0, type_id: tempTyperArray });
  }

  function CountryFilterSet(e) {
    if (!!FormDataAttr?.country_id) {
      InnerCountryArray = [...FormDataAttr.country_id];
    } else {
      InnerCountryArray = [];
    }

    const newCountryId = e.target.value;
    if (!InnerCountryArray.includes(newCountryId)) {
      InnerCountryArray.push(newCountryId.toString());
      // console.log("push")
    } else {
      InnerCountryArray.splice(InnerCountryArray.indexOf(newCountryId), 1);
      //console.log("splice")
    }
    let tempCountryrArray = InnerCountryArray;
    setFormDataAttr({ limit: 20, offset: 0, country_id: tempCountryrArray });
  }

  function ColorFilterSet(e) {
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
  }

  function clearFilter() {
    setFormDataAttr({ limit: 20, offset: 0 });
  }

  const [CountryInfo, setCountryInfo] = useState([]);

  const [isActive, setActive] = useState("false");
  const ToggleFilter = () => {
    setActive(!isActive);
    document.body.classList.toggle("modal-open");
  };

  const [ColorInfo, setColorInfo] = useState([]);
  const [FilterTypeInfo, setFilterTypeInfo] = useState([]);
  const [ProductData, setProductData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`${process.env.SERVER_LINK}/api/colors`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setColorInfo(res.data);
    });

    axios.get(`${process.env.SERVER_LINK}/api/productTypes`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setFilterTypeInfo(res.data);
    });

    axios.get(`${process.env.SERVER_LINK}/api/productsCountry`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setCountryInfo(res.data);
    });

    const FormData = FormDataAttr;
    console.log(FormData);
    //     function clean(obj) {
    //         for (var propName in obj) {
    //         if (obj[propName] === null || obj[propName] === undefined || obj[propName] === isNaN() || obj[propName].length === 0) {

    //             delete obj[propName];
    //         }
    //         }
    //         return obj
    //     }

    //    // clean(FormData);

    axios
      .post(`${process.env.SERVER_LINK}/api/products/filter`, FormData)
      .then((res) => {
        setProductData(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="webPageCn">
      <Meta MetaPage="products" />
      <Navbar InPage="Products" />

      <section>
        <div className="ProductsCN">
          <Row className="m-0">
            <div className="HomeMediaTitle">
              {" "}
              منتجاتنا | <span>ايطاليا</span>{" "}
            </div>
            <div className="HomeMediaDesc">
              تعتبر شركة رخام الأمين التجارية من أكثر مصانع الرخام التي تسعى
              لفهم متطلبات العميل بهدف تقديم أفضل خدمة ممكنة وتأمين النوع الأفضل
              للرخام والجرانيت المطلوب من قبل عملائها بأفضل جودة وكلفة ممكنة.
              ولخدمتكم بشكل أدق يرجى من حضرتكم تعبئة النموذج التالي، وسيقوم أحد
              مستشارين الرخام لدينا بالتواصل معكم لترتيب موعد.
            </div>
          </Row>
          <Row className="m-0">
            <Col lg={3} className="p-0">
              <div className="FiltersCN">
                <button className="filters-btn" onClick={ToggleFilter}>
                  <span className="filters-btn__filter_text">تصنيف</span>
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
                      <div className="FilterTitle">التصانيف:</div>
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
                          <div className="FilterSubtitle">المصدر</div>
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
                                      {data.country}
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
                          <div className="FilterSubtitle">اللون</div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="FilterColorBox">
                            <div
                              className="ColorBox  active clearFilter"
                              style={{ backgroundColor: `#fff` }}
                              onClick={clearFilter}
                            ></div>
                            {ColorInfo.map((data, i) => {
                              return (
                                <div
                                  key={i}
                                  data-value={`${data.id}`}
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
                          <div className="FilterSubtitle">نوع الرخام</div>
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
                                      {data.title}
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
                      <button onClick={clearFilter}>مسح</button>
                      <button>تطبيق</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={1} className="p-0"></Col>
            <Col lg={8} className="p-0">
              <div className="ProductsContainer">
                <Fancybox>
                  <Row className="m-0">
                    {ProductData?.data.map((data, i) => {
                      return (
                        <Col lg={4} sm={6} xs={6} className="p-0" key={i}>
                          <div className="ProductSliderInfo text-center ProductPageInnerInfo">
                            <div className="ProductMask">
                              <div className="ProductShape"></div>
                              <div className="ProductShape2">
                                {/* {data.colors.map((colorInfo , i) => {
                                                                        return(
                                                                            <div key={i}>
                                                                            {colorInfo.imageID.map((ImageInfo , i) => {
                                                                                return ( 
                                                                                    <div key={i} data-fancybox="ProductsMostSale" data-caption={ProductNames} href={ImageInfo.imageURL}> <img key={ImageInfo.id} src={ImageInfo.imageURL} alt="rokham" />  </div>
                                                                                )
                                                                            })}
                                                                            </div>
                                                                        )
                                                                        
                                                                    })} */}

                                <div
                                  key={i}
                                  data-fancybox="ProductsMostSale"
                                  data-caption={data.title}
                                  href={data?.colors[0]?.imageID[0]?.image?.url}
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
                              {data?.colors[0].color}
                            </div>
                            <div className="ProductDevider">-</div>
                            <div className="ProductCountry">
                              {data.Country_description}{" "}
                            </div>
                            <div className="ProductType">{data.title}</div>
                            <div className="CeoLink">
                              <Link href={`/ProductsDetails/${data.id}`}>
                                المزيد من التفاصيل
                              </Link>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
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
