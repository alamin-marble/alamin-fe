import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState, useMemo, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/nav";
import MetaData from "@/components/Others/MetaData";
import LoadingSpinner from "../../../components/Others/LoadingSpinner";
import { AppContext } from "../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function ProductOrder({ productDetails }) {
  const [t] = useTranslation();
  const { productDataCtx } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ProductData, setProductData] = useState();
  const [product_id, setproduct_id] = useState();
  const [color_id, setcolor_id] = useState();
  const [product_size_id, setproduct_size_id] = useState([]);
  const [product_thikness_id, setproduct_thikness_id] = useState();
  const [product_standardSize_id, setproduct_standardSize_id] = useState();

  const router = useRouter();
  const {
    dataPassedColorId,
    dataPassedthiknessId,
    dataPassedstandardSizeid,
    SlabsdataPassedSizeId,
    StandarddataPassedSizeId,
  } = productDataCtx;
  let dataPassedSizeId = useMemo(() => [], []);

  useEffect(() => {
    setcolor_id(dataPassedColorId);

    setproduct_size_id(dataPassedSizeId);

    setproduct_thikness_id(dataPassedthiknessId);

    setproduct_standardSize_id(dataPassedstandardSizeid);
    let newArr = [];

    if (SlabsdataPassedSizeId != null) {
      newArr.push(SlabsdataPassedSizeId);
    }
    if (StandarddataPassedSizeId != null) {
      newArr.push(StandarddataPassedSizeId);
    }
    dataPassedSizeId = newArr;
  }, [
    dataPassedColorId,
    dataPassedSizeId,
    dataPassedthiknessId,
    dataPassedstandardSizeid,
    SlabsdataPassedSizeId,
    StandarddataPassedSizeId,
  ]);

 

  useEffect(() => {
    const ProductID = router.query.id;

    setproduct_id(ProductID);
    setProductData(productDetails);
  }, [productDetails]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [UploadFileName, setUploadFileName] = useState([]);
  const [ShowUploadBtn, setShowUploadBtn] = useState(true);
  const [title, settitle] = useState("اللقب");
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [mobile, setmobile] = useState();
  const [email, setemail] = useState();
  const [company, setcompany] = useState();
  const [type, settype] = useState("person");
  const [details, setdetails] = useState();
  const [companyActivity, setcompanyActivity] = useState();
  const [website, setwebsite] = useState();
  const [area, setarea] = useState();
  const [address, setaddress] = useState();
  const [constructionType, setconstructionType] = useState();
  const [uses, setuses] = useState();
  const [attachment, setattachment] = useState(null);
  const [image2, setimage2] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleImageChange(e) {
    setattachment(e.target.files[0]);
    setUploadFileName(e.target.files[0]);
  }

  function handleSelectChange(e) {
    settitle(e.target.value);
  }

  function handleRadioChange(e) {
    settype(e.target.value);
  }
  function ChangeEnabled() {
    document.getElementById("CPname").disabled = false;
    document.getElementById("CPactivity").disabled = false;
  }
  function ChangeDisabled() {
    document.getElementById("CPname").disabled = true;
    document.getElementById("CPactivity").disabled = true;
  }

  const uploadImg = () => {
    setIsLoading(true);
    let submitValues = {
      file: attachment,
    };

    axios
      .post(`${process.env.SERVER_LINK}/api/images`, submitValues, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        setimage2(res.data.id);
        setIsUploaded(true);
        setIsLoading(false);
        setShowUploadBtn(false);
        return res;
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  };

  const AddHandleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    
    const FormData = {
      product_id: product_id,
      title: title,
      color_id: color_id,
      product_size_id: product_size_id,
      product_thikness_id: product_thikness_id,
      product_standardSize_id: product_standardSize_id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      details: details,
      type: type,
      company: company,
      companyActivity: companyActivity,
      website: website,
      area: area,
      address: address,
      constructionType: constructionType,
      uses: uses,
      attachment: isUploaded ? image2 : null,
      mobile: mobile,
    };

    function clean(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === isNaN()
        ) {
          delete obj[propName];
        }
      }
      return obj;
    }

    clean(FormData);

    console.log(FormData);

    axios
      .post(`${process.env.SERVER_LINK}/api/orders/create`, FormData)
      .then(function (response) {
        if (response.status === 200) {
          if(i18n.language === "ar")
          {
            window.location.href = "/ThankYou";
          }
          else
          {
            window.location.href = "/en/ThankYou";
          }
        }
        console.log(response);
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  };

  return (
    <div className="webPageCn">
      {!!productDetails.data && (
        <MetaData
          title={i18n.language === "ar" ?  productDetails.data[0].metaTitle : productDetails.data[0].metaTitleEn}
          description={i18n.language === "ar" ?  productDetails.data[0].metaDescription : productDetails.data[0].metaDescriptionEn}
          image={""}
        ></MetaData>
      )}
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad">
              {t("buyReq")}-
              {ProductData?.data.map((data, i) => {
                return (
                 
                    <span key={i}> {i18n.language === "ar" ?  data.title : data.titleEn}</span>
                 
                );
              })}
            </div>

            <div className="HomeMediaDesc">{t("sendDetails")}</div>

            <div className="FormCN ConsultingForm">
              <form onSubmit={AddHandleSubmit}>
                <Row>
                  <Col lg={12} className="p-0">
                    <select
                      value={title}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="">{t("formTitle")}</option>
                      <option value="Mr">{t("mr")}</option>
                      <option value="Mrs">{t("mrs")}</option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      value={firstName}
                      placeholder={t("firstName")}
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      value={lastName}
                      placeholder={t("lastName")}
                      onChange={(e) => setlastName(e.target.value)}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={3} sm={3} xs={6}>
                    <label>
                      <input
                        type="radio"
                        value="person"
                        name="type"
                        onChange={handleRadioChange}
                        onClick={ChangeDisabled}
                        required
                      />
                      {t("typePerson")}
                    </label>
                  </Col>
                  <Col lg={3} sm={3} xs={6}>
                    <label>
                      <input
                        type="radio"
                        value="company"
                        name="type"
                        onChange={handleRadioChange}
                        onClick={ChangeEnabled}
                        required
                      />
                      {t("typeCompany")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      id="CPname"
                      value={company}
                      placeholder={t("companyName")}
                      disabled
                      onChange={(e) => setcompany(e.target.value)}
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      id="CPactivity"
                      value={companyActivity}
                      placeholder={t("companyActivity")}
                      disabled
                      onChange={(e) => setcompanyActivity(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className="p-0">
                    <input
                      type="text"
                      value={mobile}
                      placeholder={t("mobile")}
                      onChange={(e) => setmobile(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      value={email}
                      placeholder={t("email")}
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      value={website}
                      placeholder={t("website")}
                      onChange={(e) => setwebsite(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      value={area}
                      placeholder={t("area")}
                      onChange={(e) => setarea(e.target.value)}
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      value={address}
                      placeholder={t("address")}
                      onChange={(e) => setaddress(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className="p-0">
                    <input
                      type="text"
                      value={constructionType}
                      placeholder={t("constructionType")}
                      onChange={(e) => setconstructionType(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="FormDeviderLabel pe-0 ps-0">
                   {t("uses")}:
                  </div>
                </Row>

                <Row>
                  <Col lg={12} className="p-0">
                    <input
                      type="text"
                      value={uses}
                      placeholder={t("uses")}
                      onChange={(e) => setuses(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="FormDeviderLabel pe-0 ps-0">
                    {t("detailsText")}
                  </div>
                </Row>
                <Row>
                  <Col lg={12} className="p-0">
                    <textarea
                      value={details}
                      onChange={(e) => setdetails(e.target.value)}
                      rows={5}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="FormDeviderLabel pe-0 ps-0">
                    {t("uploadText")}
                  </div>
                </Row>
                <Row>
                  <Col lg={12} className="p-0">
                    <div
                      className="uploadLabel"
                      variant="primary"
                      onClick={handleShow}
                    >
                      {isUploaded ? (
                        <div className="FileName">
                          {t("fileName")} {UploadFileName.name}
                        </div>
                      ) : (
                        <>
                          <span>{t("uploadFieldText")}</span>
                          <span>
                            <svg
                              height="17"
                              viewBox="0 0 1792 1792"
                              width="1792"
                            >
                              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z" />
                            </svg>
                          </span>
                        </>
                      )}
                    </div>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{t("uploadFieldText")}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {isLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            {isUploaded ? (
                              <div className="FileName">
                                {t("fileName")} {UploadFileName.name}
                              </div>
                            ) : (
                              <div className="w-100">
                                <div className="pb-2" style={{color:"#000"}}>{t("allowedFilesimg")}</div>
                                <input
                                  type="file"
                                  name="attachment"
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                              </div>
                            )}
                          </>
                        )}
                        <input
                          placeholder="image2"
                          type="text"
                          name="image2"
                          value={image2}
                          onChange={(e) => setimage2(e.target.value)}
                          style={{ display: "none" }}
                        />
                        <div className="ModalFileBtnCN">
                          {ShowUploadBtn ? (
                            <button onClick={uploadImg}>{t("uploadFieldBtnText")}</button>
                          ) : null}
                        </div>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>

                <button type="submit">{t("sendBtn")}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  try {
    const { id } = query;
    const [productDetailsRes] = await Promise.all([
      axios.post(`${process.env.SERVER_LINK}/api/products/filter`, {
        limit: 10,
        offset: 0,
        product_id: id,
      }),
    ]);
    const productDetails = productDetailsRes.data;
    return {
      props: {
        productDetails,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        productDetails: null,
      },
    };
  }
};
