import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/nav";
import Footer from "@/components/Footer";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
export default function UniqueRockOrder({ orderData, UniqeRockID }) {
  const [t] = useTranslation();
  const [name, setname] = useState();
  const [mobile, setmobile] = useState();
  const [email, setemail] = useState();
  const [details, setdetails] = useState();

  const [uniqeRock_id, setuniqeRock_id] = useState();

  const [Rocks, setRocks] = useState([]);

  useEffect(() => {
    if (orderData) {
      setRocks(orderData);
      setuniqeRock_id(UniqeRockID);
    }
  }, [orderData]);

  const AddHandleSubmit = async (e) => {
    e.preventDefault();
    const FormDataInput = {
      uniqeRock_id: parseInt(uniqeRock_id),
      Name: name,
      mobile: parseInt(mobile),
      email: email,
      details: details,
    };
    //console.log(FormDataInput)
    axios
      .post(`${process.env.SERVER_LINK}/api/uniqueRockOrder`, FormDataInput)
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
        //console.log(response.status)
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  };
  return (
    <div className="webPageCn">
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad"> {t("orderNow")} </div>

            <div className="FormCN ConsultingForm CareersForm m-0">
              <form onSubmit={AddHandleSubmit}>
                <Row>
                  <Col lg={12} sm={12} xs={12} className="p-0">
                    <input
                      type="text"
                      value={name}
                      placeholder= {t("name")} 
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={6} xs={6} className="pr-0">
                    <input
                      type="text"
                      value={email}
                      placeholder= {t("email")} 
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      value={mobile}
                      placeholder= {t("mobile")} 
                      onChange={(e) => setmobile(e.target.value)}
                      onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} className="p-0">
                    <textarea
                      value={details}
                      placeholder={t("details")}
                      onChange={(e) => setdetails(e.target.value)}
                      rows={5}
                      
                    />
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

export async function getServerSideProps({ query }) {
  try {
    const { id } = query;
    const orderRes = await axios.get(
      `${process.env.SERVER_LINK}/api/uniqueRock/${id}?limit=1`
    );
    const orderData = orderRes.data;
    return {
      props: {
        orderData,
        UniqeRockID: id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orderData: null,
        UniqeRockID: null,
      },
    };
  }
}
