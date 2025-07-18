import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import "../../../";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

export default function UniqueRockOrder() {
  const { UniqeRockID } = useParams();
  const [name, setname] = useState();
  const [mobile, setmobile] = useState();
  const [email, setemail] = useState();
  const [details, setdetails] = useState();

  const [uniqeRock_id, setuniqeRock_id] = useState();

  const [Rocks, setRocks] = useState([]);

  useEffect(() => {
    const fetchRocks = () => {
      return axios
        .get(`${process.env.SERVER_LINK}/api/uniqueRock/${UniqeRockID}?limit=1`)
        .then((res) => {
          setRocks(res.data);
        })
        .catch((e) => {
          console.error(e.response.data);
        });
    };
    fetchRocks();
    setuniqeRock_id(Rocks.id);
  }, [UniqeRockID, Rocks.id]);

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
          window.location.href = "/ThankYou";
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
            <div className="HomeMediaTitle AboutPad"> اطلب الان</div>

            <div className="FormCN ConsultingForm CareersForm m-0">
              <form onSubmit={AddHandleSubmit}>
                <Row>
                  <Col lg={12} sm={12} xs={12} className="p-0">
                    <input
                      type="text"
                      value={name}
                      placeholder="الاسم"
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
                      placeholder="البريد الالكتروني"
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input
                      type="text"
                      value={mobile}
                      placeholder="رقم الجوال"
                      onChange={(e) => setmobile(e.target.value)}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} className="p-0">
                    <textarea
                      value={details}
                      placeholder="تفاصيل اخرى"
                      onChange={(e) => setdetails(e.target.value)}
                      rows={5}
                      required
                    />
                  </Col>
                </Row>

                <button type="submit">إرسال</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
