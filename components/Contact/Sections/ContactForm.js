import React, {useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
export default function ContactForm() {
    const [t] = useTranslation();


    const [firstName , setfirstName] = useState();
    const [lastName , setlastName] = useState();
    const [mobile , setmobile] = useState();
    const [service , setservice] = useState();
    const [email , setemail] = useState();
    const [companyName , setcompanyName] = useState();
    const [type , settype] = useState(""); 
    const [details , setdetails] = useState();


    const AddHandleSubmit = async (e) => {
        e.preventDefault();
        const FormDataInput = {
          "firstName": firstName,
          "lastName": lastName,
          "mobile": parseInt(mobile),
          "email": email,
          'service': service,
          "details": details,
          "type": type,
          "companyName": companyName,
      }

            axios
                .post(`${process.env.SERVER_LINK}/api/contactForm`, FormDataInput)
                .then(function(response) {
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
                .catch(e => {
    console.error(e);
  });

      }
    return(
        <div className="FormCN">

           <form onSubmit={AddHandleSubmit}>
                <Row>
                    <Col lg={6}  sm={6} xs={6} className={i18n.language === "ar" ? "pr-0" : "pl-0"}>
                    <input type="text" value={firstName} placeholder={t("firstName")} onChange={(e) => setfirstName(e.target.value)} required />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className={i18n.language === "ar" ? "pl-0" : "pr-0"}>
                    <input type="text" value={lastName} placeholder={t("lastName")} onChange={(e) => setlastName(e.target.value)} required />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={email} placeholder={t("email")} onChange={(e) => setemail(e.target.value)} required />
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} sm={3}  xs={6}>
                    <label><input type="radio" value="فرد" name="type" onChange={(e) => settype(e.target.value)} required />{t("typePerson")}</label>
                    </Col>
                    <Col lg={3} sm={3}  xs={6}>
                    <label><input type="radio" value="شركة" name="type" onChange={(e) => settype(e.target.value)} required />{t("typeCompany")}</label>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={mobile} placeholder={t("mobile")} onChange={(e) => setmobile(e.target.value)}  onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} required />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={companyName} placeholder={t("companyName")} onChange={(e) => setcompanyName(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    

                    <select value={service} onChange={(e) => setservice(e.target.value)} required>
                            <option value="">{t("chooseService")} </option>
                            <option value="Consulting">{t("consultation")}</option>
                            <option value="Inspection and take sizes">{t("service2")}</option>
                            <option value="Drawing and artworks"> {t("service3")} </option>
                            <option value="Cut and treatment">{t("service4")}</option>
                            <option value="Installation">{t("service5")}</option>                            
                            <option value="Retail or wholesale">{t("service6")}</option>
                    </select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <textarea value={details} placeholder={t("details")} onChange={(e) => setdetails(e.target.value)} rows={5} required/>
                    </Col>
                </Row>
                
                <button type="submit">{t("sendBtn")}</button>
                </form>
        </div>
    )
}