import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/nav";
import Footer from "@/components/Footer";
import Meta from "@/components/Others/Meta";
import LoadingSpinner from "@/components/Others/LoadingSpinner";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
export default function CareersForm({ careersData, metaData, CareerID }) {
  const [t] = useTranslation();
  

  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [NotUploadedYet, setNotUploadedYet] = useState(false);
  const [UploadFileName, setUploadFileName] = useState([]);
  const [ShowUploadBtn, setShowUploadBtn] = useState(true);

  const [name, setname] = useState();
  const [gender, setgender] = useState("الجنس");
  const [mobile, setmobile] = useState();
  const [email, setemail] = useState();
  const [previouslyWork, setpreviouslyWork] = useState("");
  const [cv, setcv] = useState();
  const [cv2, setcv2] = useState();
  const [jobID, setjobID] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    if (careersData) {
      setJobs(careersData);
      setjobID(CareerID);
    }
  }, [careersData]);

  function handleImageChange(e) {
    setcv(e.target.files[0]);
    setUploadFileName(e.target.files[0]);
  }
  const uploadImg = () => {
    setIsLoading(true);
    console.log(UploadFileName);
    let submitValues = {
      file: cv,
    };
    axios
      .post(`${process.env.SERVER_LINK}/api/images`, submitValues, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        console.log("upload", res.data);
        setcv2(res.data.id);
        setIsUploaded(true);
        setIsLoading(false);
        setShowUploadBtn(false);
       
        console.log('NotUploadedYet from image' , NotUploadedYet)
        return res;
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  };
   
  const AddHandleSubmit = async (e) => {
    
    
    setIsLoading(false);
    console.log('NotUploadedYet from btn' , NotUploadedYet)
    if(NotUploadedYet === false){
      setNotUploadedYet(true);
    } 
    else
    {
      setNotUploadedYet(false);
    }
   
    e.preventDefault();
    const FormDataInput = {
      name: name,
      gender: gender,
      mobile: parseInt(mobile),
      email: email,
      previouslyWork: previouslyWork,
      cv: cv2,
      JobID: parseInt(jobID),
    };
    console.log(FormDataInput);
    axios
      .post(`${process.env.SERVER_LINK}/api/careers`, FormDataInput)
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
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className="webPageCn">
      <Meta MetaData={metaData} />
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad"> {t("applyJobInner")} </div>
            <div className="HomeMediaDesc p-0">
            {t("wantWork")}
            </div>

            <div className="FormCN ConsultingForm CareersForm m-0">
              <form onSubmit={AddHandleSubmit}>
                <Row>
                  <div className="careerDevider pe-0 ps-0">
                    {t("personalData")}
                  </div>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      value={name}
                      placeholder={t("name")}
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <select
                      value={gender}
                      onChange={(e) => setgender(e.target.value)}
                      required
                    >
                      <option value="">{t("gender")}</option>
                      <option value="Male">{t("male")}</option>
                      <option value="Female">{t("female")}</option>
                    </select>
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
                      value={mobile}
                      placeholder={t("mobile")}
                      onChange={(e) => setmobile(e.target.value)}
                      onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={6} xs={6} className=" careerQustion p-0">
                    {" "}
                    {t("workBefore")}
                  </Col>
                  <Col lg={1} sm={1} xs={3}>
                    <label>
                      <input
                        type="radio"
                        value="yes"
                        name="previouslyWork"
                        onChange={(e) => setpreviouslyWork(e.target.value)}
                        required
                      />
                      {t("yes")}
                    </label>
                  </Col>
                  <Col lg={1} sm={1} xs={3}>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        name="previouslyWork"
                        onChange={(e) => setpreviouslyWork(e.target.value)}
                        required
                      />
                      {t("no")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} sm={12} xs={12} className="p-0">
                     {NotUploadedYet ?  <div className="error">{t("uploadErr")}</div> : ""} 
                  </Col>
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
                          <span> {t("uploadCv")}</span>
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
                        <Modal.Title>  {t("uploadCv")}</Modal.Title>
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
                                <div className="pb-2" style={{color:"#000"}}>{t("allowedFiles")}</div>
                                <input
                                  type="file"
                                  name="cv"
                                  onChange={handleImageChange}
                                  accept="application/msword , application/pdf"
                                />
                              </div>
                            )}
                          </>
                        )}
                        <input
                          placeholder="cv"
                          type="text"
                          name="cv2"
                          value={cv2}
                          onChange={(e) => setcv2(e.target.value)}
                          style={{ display: "none" }}
                          required
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

export const getServerSideProps = async ({ query , locale }) => {
  try {
   
    const { id } = query;
    const [careersRes, metaRes] = await Promise.all([
      axios.get(`${process.env.SERVER_LINK}/api/availableJobs/${id}`),
      axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=careers`),
    ]);
    const careersData = careersRes.data;
    const metaData = metaRes.data;
    return {
      props: {
        careersData,
        metaData,
        CareerID: id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        careersData: null,
        metaData: null,
        CareerID: null,
      },
    };
  }
};
