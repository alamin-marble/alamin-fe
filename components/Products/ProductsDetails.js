import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import { Link } from "react-router-dom";
import ProductSlider from "./Sections/ProductSlider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ProductsDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ProductData, setProductData] = useState();
  const [galleryColorId, setgalleryColorId] = useState();
  const [dataPassedColorId, setdataPassedColorId] = useState();

  const [SlabsdataPassedSizeId, setSlabsdataPassedSizeId] = useState(null);
  const [StandarddataPassedSizeId, setStandarddataPassedSizeId] =
    useState(null);
  const [dataPassedthiknessId, setdataPassedthiknessId] = useState(null);
  const [dataPassedstandardSizeid, setdataPassedstandardSizeid] =
    useState(null);

  const { ProductID } = useParams();
  useEffect(() => {
    axios
      .post(`${process.env.SERVER_LINK}/api/products/filter`, {
        limit: 10,
        offset: 0,
        product_id: ProductID,
      })
      .then((res) => {
        // console.log(res.data)
        setProductData(res.data);

        setgalleryColorId(res?.data?.data[0]?.colors[0]?.colorID);
        setdataPassedColorId(res?.data?.data[0]?.colors[0]?.colorID);
      })
      .catch((err) => console.log("err", err));
  }, [ProductID]);

  function ChangeSlider(e) {
    setgalleryColorId(e.currentTarget.getAttribute("data-value"));
    var elems = document.querySelectorAll(".ColorBox");

    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });

    e.currentTarget.classList.add("active");
  }

  function ChangeProductShow(e) {
    //     const newId = e.currentTarget.getAttribute('value');                 //new id
    //     if(!dataPassedSizeId.includes(newId)){          //checking weather array contain the id
    //         dataPassedSizeId.push(newId);               //adding to array because value doesnt exists
    //     }else{
    //         dataPassedSizeId.splice(dataPassedSizeId.indexOf(newId), 1);  //deleting
    //     }
    // console.log(dataPassedSizeId)

    var checkbox = document.getElementById("checkbox1");
    var text = document.getElementById("sizes1");

    // If the checkbox is checked, display the output text
    if (checkbox.checked === true) {
      text.style.display = "block";
      setSlabsdataPassedSizeId("22");
      // console.log(SlabsdataPassedSizeId)
    } else {
      text.style.display = "none";
      setSlabsdataPassedSizeId(null);
      //console.log(SlabsdataPassedSizeId)
    }

    var checkbox2 = document.getElementById("checkbox2");
    var text2 = document.getElementById("sizes2");

    // If the checkbox is checked, display the output text
    if (checkbox2.checked === true) {
      text2.style.display = "block";
      setStandarddataPassedSizeId("23");
      //console.log(StandarddataPassedSizeId)
    } else {
      text2.style.display = "none";
      setStandarddataPassedSizeId(null);
      // console.log(StandarddataPassedSizeId)
    }
  }

  return (
    <div className="webPageCn">
      <Navbar InPage="Products" />

      <div className="ProductsCN">
        {ProductData?.data.map((data, i) => {
          return (
            <div key={i}>
              <Row className="ProductInnerCN">
                <Col lg={5} className="p-0 order-res-2">
                  <div className="ProductDetails-Header">
                    <div className="HomeMediaTitle p-0">{data.title}</div>
                    <div className="ProductCode">
                      <div className="ProductCodeText">كود المنتج</div>
                      <div className="ProductCodeNumber">{data.code}</div>
                    </div>
                  </div>
                  <div className="HomeMediaDesc">{data.description}</div>
                  <div className="ProductInfo">
                    <Row className="m-0">
                      <Col lg={6} className="p-0">
                        <div className="ProductInfoFirstType">
                          <div className="ProductInfoTitle">
                            <span className="PrInnerTitle"> الدولة: </span>
                            <b>{data.Country_title}</b>
                          </div>
                          <div className="ProductInfoTitle">
                            <span className="PrInnerTitle"> النوع: </span>
                            <b>{data.Type_title}</b>
                          </div>
                          <div className="ProductInfoTitle">
                            <span className="PrInnerTitle"> الوحدة: </span>
                            <b>{data.unite}</b>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6} className="p-0">
                        <div className="ProductInfoTitle">
                          <span className="PrInnerTitle">اللون: </span>
                          <span className="FilterColorBox">
                            {data.colors.map((colorInfo, i) => {
                              return (
                                <div
                                  key={i}
                                  data-value={`${colorInfo.colorID}`}
                                  value={`${colorInfo.colorID}`}
                                  onChange={(e) =>
                                    setdataPassedColorId(e.target.value)
                                  }
                                  onClick={ChangeSlider}
                                  className={
                                    i === 0 ? "ColorBox  active" : "ColorBox "
                                  }
                                  style={{
                                    backgroundColor: `${colorInfo.hexCode}`,
                                  }}
                                ></div>
                              );
                            })}
                          </span>
                        </div>

                        <div className="ProductInfoTitle">
                          <div className="filters-checkboxes-btns">
                            <ul>
                              {data.sizes.map((sizesInfo, i) => {
                                return (
                                  <>
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={`checkbox${sizesInfo.Size_id}`}
                                        name="Source[]"
                                        value={`${sizesInfo.id}`}
                                        onChange={ChangeProductShow}
                                      />
                                      <label
                                        htmlFor={`checkbox${sizesInfo.Size_id}`}
                                      >
                                        {sizesInfo.Size_title}
                                      </label>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        <div className="ProductInfoFirstType">
                          <div
                            id="sizes1"
                            className="ProductInfoTitle"
                            style={{ display: "none" }}
                          >
                            <span className="PrInnerTitle">السمك:</span>
                            <select
                              onChange={(e) =>
                                setdataPassedthiknessId(e.target.value)
                              }
                            >
                              <option>اختر السمك</option>
                              {data.thickness_id.map((thickness_idInfo, i) => {
                                return (
                                  <>
                                    <option
                                      key={i}
                                      value={thickness_idInfo.thickness_id}
                                    >
                                      {thickness_idInfo.thickness_title}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                          </div>

                          <div
                            id="sizes2"
                            className="ProductInfoTitle"
                            style={{ display: "none" }}
                          >
                            <span className="PrInnerTitle">المقاس:</span>
                            <select
                              onChange={(e) =>
                                setdataPassedstandardSizeid(e.target.value)
                              }
                            >
                              <option>اختر المقاس</option>
                              {data.standardSize_id.map(
                                (standardSize_idInfo, i) => {
                                  return (
                                    <>
                                      <option
                                        key={i}
                                        value={
                                          standardSize_idInfo.standardSize_id
                                        }
                                      >
                                        {standardSize_idInfo.Size_title}
                                      </option>
                                    </>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="ProductInfoREQbtn">
                    <Link
                      href={`/ProductOrder/${data.id}`}
                      state={{
                        dataPassedColorId: dataPassedColorId,
                        dataPassedthiknessId: dataPassedthiknessId,
                        dataPassedstandardSizeid: dataPassedstandardSizeid,
                        SlabsdataPassedSizeId: SlabsdataPassedSizeId,
                        StandarddataPassedSizeId: StandarddataPassedSizeId,
                      }}
                    >
                      اطلبه الان
                    </Link>
                  </div>

                  <div className="ProductShare">
                    <div className="ProductShareCall">
                      <div className="CeoLink">
                        <a href="/ProductsDetails">دردش معنا واتساب</a>
                      </div>
                      <div className="CeoLink">
                        <a href="/ProductsDetails">اتصل الآن</a>
                      </div>
                    </div>
                    <div className="ProductShareSocial">
                      <div className="ProductShareSocialTitle">
                        شارك المنتج:{" "}
                      </div>
                      <ul>
                        <li>
                          <a href="/#">
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Facebook</title>
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="/#">
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Twitter</title>
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="/#">
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>LinkedIn</title>
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col lg={1} className="p-0"></Col>
                <Col lg={6} className="p-0  order-res-1">
                  <ProductSlider
                    ColorProductId={ProductID}
                    colorID={galleryColorId}
                  />
                </Col>
              </Row>

              <Row className="m-0">
                <Col lg={12} className="p-0">
                  <Tabs>
                    <TabList id="myList">
                      {data.detailsInformation.map(
                        (detailsInformationInfo, i) => {
                          return (
                            <Tab key={i}>{detailsInformationInfo.title}</Tab>
                          );
                        }
                      )}
                    </TabList>

                    {data.detailsInformation.map(
                      (detailsInformationInfo, i) => {
                        return (
                          <TabPanel key={i}>
                            <div className="TabDescription">
                              {detailsInformationInfo.description}
                            </div>
                          </TabPanel>
                        );
                      }
                    )}
                  </Tabs>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
