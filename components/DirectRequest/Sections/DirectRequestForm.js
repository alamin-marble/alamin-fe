import React, {useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "../../Others/LoadingSpinner";
import Countries from "./Countries";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function DirectRequestForm() {
    const [t] = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [UploadFileName , setUploadFileName] = useState([]);
    const [ShowUploadBtn, setShowUploadBtn] = useState(true);
    const [title , settitle] = useState('اللقب');
    const [country_Name , setcountry_Name] = useState('');
    const [firstName , setfirstName] = useState();
    const [lastName , setlastName] = useState();
    const [mobile , setmobile] = useState();
    const [email , setemail] = useState();
    const [company , setcompany] = useState();
    const [type , settype] = useState("person"); 
    const [details , setdetails] = useState();
    const [companyActivity , setcompanyActivity] = useState();
    const [website , setwebsite] = useState();
    const [area , setarea] = useState();
    const [address , setaddress] = useState();
    const [constructionType , setconstructionType] = useState();
    const [product , setproduct] = useState();
    const [otherProduct , setotherProduct] = useState();
    const [uses , setuses] = useState();
    const [attachment , setattachment] = useState(null);
    const [image2, setimage2] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleImageChange(e) {
        setattachment(e.target.files[0])
        setUploadFileName(e.target.files[0])
    }
    
   function handleSelectChange(e) {
        settitle(e.target.value)
    }

    function handleRadioChange(e) {
        settype(e.target.value)
    }
    function ChangeEnabled() {
            document.getElementById("CPname").disabled = false;
            document.getElementById("CPactivity").disabled = false;
    }
    function ChangeDisabled() {
            document.getElementById("CPname").disabled = true;
            document.getElementById("CPactivity").disabled = true;
    }
    function ChangeOtherEnabled() {
        // document.getElementById("PRother").disabled = false;
        var txtPassportNumber = document.getElementById("FilternaturalStone");
        document.getElementById("PRother").disabled = txtPassportNumber.checked ? false : true;
    }
    function ChangeOtherDisabled() {
            document.getElementById("PRother").disabled = true;
    }
    const uploadImg = () => {
        setIsLoading(true);
       
        let submitValues = {
          file: attachment,
          altEn: "s", 
        };

        axios
                .post(`${process.env.SERVER_LINK}/api/images`, submitValues , {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  })
                .then(function(res) {
                   
                    setimage2(res.data.id);
                    setIsUploaded(true);
                    setIsLoading(false);
                    setShowUploadBtn(false);
                    return res;
                })
                .catch(e => {
                    console.error(e.response.data);
                });
    };




    let ProductsNames = document.querySelectorAll("[type='checkbox']");
    let favoriteProductsNames = [];
    
    function createProductsNames() {
      favoriteProductsNames = [];
      let checked = document.querySelectorAll("[type='checkbox']:checked");
      checked.forEach(function(el) {
        favoriteProductsNames.push(el.value);
      });
      var stringArr=favoriteProductsNames.join(',');
      setproduct(stringArr);
    }
    
    ProductsNames.forEach(function(el) {
      el.addEventListener("change", function() {
        createProductsNames();
      });
    });



    
    const AddHandleSubmit = async (e) => {
      
       
    setIsLoading(false);
   
    e.preventDefault();

        
        const FormData = {
            title: title,
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
            product: product,
            otherProduct: otherProduct,
            uses: uses,
            attachment: isUploaded ? image2 : null,
            mobile: parseInt(mobile),
            country_Name: country_Name,
          };
 
       
            axios
                .post(`${process.env.SERVER_LINK}/api/directRequestForm`, FormData)
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
                    console.error(e.response.data);
                });

      }

    return(
         <div className="FormCN ConsultingForm">
      
           <form onSubmit={AddHandleSubmit}>
                <Row>
                    <Col lg={12} className="p-0">
                        <select value={title} onChange={handleSelectChange} required>
                            <option value=""> {t("formTitle")}</option>
                            <option value="Mr"> {t("mr")}</option>
                            <option value="Mrs"> {t("mrs")}</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}  sm={6} xs={6} className="pr-0">
                    <input type="text" value={firstName} placeholder={t("firstName")} onChange={(e) => setfirstName(e.target.value)} required />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input type="text" value={lastName} placeholder={t("lastName")} onChange={(e) => setlastName(e.target.value)} required />
                    </Col>
                </Row>
 
                <Row>
                    <Col lg={3} sm={3}  xs={6}>
                    <label><input type="radio" value="person" name="type"  onChange={handleRadioChange} onClick={ChangeDisabled} required/> {t("typePerson")}</label>
                    </Col>
                    <Col lg={3} sm={3}  xs={6}>
                    <label><input type="radio" value="company" name="type" onChange={handleRadioChange} onClick={ChangeEnabled} required/> {t("typeCompany")}</label>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}  sm={6} xs={6} className="pr-0">
                    <input type="text" id="CPname" value={company} placeholder={t("companyName")} disabled onChange={(e) => setcompany(e.target.value)}  />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input type="text" id="CPactivity" value={companyActivity} placeholder={t("companyActivity")} disabled  onChange={(e) => setcompanyActivity(e.target.value)}  />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                        <select value={country_Name} onChange={ (e) =>  setcountry_Name(e.target.value)} required>
                            <option value="">{t("country")}</option>
                            <Countries />
                            
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={mobile} placeholder={t("mobile")} onChange={(e) => setmobile(e.target.value)} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} required />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}  sm={6} xs={6} className="pr-0">
                    <input type="text" value={email} placeholder={t("email")} onChange={(e) => setemail(e.target.value)} required />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input type="text" value={website} placeholder={t("website")} onChange={(e) => setwebsite(e.target.value)}  />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}  sm={6} xs={6} className="pr-0">
                    <input type="text" value={area} placeholder={t("area")} onChange={(e) => setarea(e.target.value)}  />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className="pl-0">
                    <input type="text" value={address} placeholder={t("address")} onChange={(e) => setaddress(e.target.value)}  required />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={constructionType} placeholder={t("constructionType")} onChange={(e) => setconstructionType(e.target.value)}  />
                    </Col>
                </Row>
                <Row>
                    <div className="FormDeviderLabel pe-0 ps-0">{t("requiredProduct")}:</div>
                </Row>
                <Row className="ProductsRadio">
                    <Col lg={2} sm={2} xs={12} className="p-0">
                        <div className="filters-checkboxes-btns">
                            <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    id="Filtermarble"
                                    name="product"
                                    value="رخام"
                                    onClick={ChangeOtherDisabled}
                                />
                                <label htmlFor="Filtermarble">
                                {t("marble")}
                                </label>   
                            </li>
                            </ul>
                                
                        </div>
                    </Col>
                    <Col lg={2} sm={2} xs={12} className="p-0">
                        <div className="filters-checkboxes-btns">
                            <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    id="Filtergranite"
                                    name="product"
                                    value="جرانيت"
                                    onClick={ChangeOtherDisabled}
                                />
                                <label htmlFor="Filtergranite">
                                {t("granite")}
                                </label>  
                            </li>
                            </ul>
                                    
                        </div>
                    </Col>
                    <Col lg={3} sm={3} xs={12} className="p-0">
                    <div className="filters-checkboxes-btns">
                            <ul>
                            <li>
                                <input
                                type="checkbox"
                                id="FilternaturalStone"
                                name="product"
                                value="أنواع اخرى"
                                onClick={ChangeOtherEnabled}
                                />
                                <label htmlFor="FilternaturalStone">
                                {t("naturalStone")}
                                </label>  
                            </li>
                            </ul>
                                    
                        </div>
                    </Col>
                    <Col lg={5} sm={5} xs={12} className="p-0">
                        <input
                        type="text"
                        id="PRother"
                        value={otherProduct}
                        onChange={(e) => setotherProduct(e.target.value)}
                        disabled
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <input type="text" value={uses} placeholder={t("uses")} onChange={(e) => setuses(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <div className="FormDeviderLabel pe-0 ps-0">{t("detailsText")}</div>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                    <textarea value={details}  onChange={(e) => setdetails(e.target.value)} rows={5} required/>
                    </Col>
                </Row>
                <Row>
                    <div className="FormDeviderLabel pe-0 ps-0"> {t("uploadText")} </div>
                </Row>
                <Row>
                    <Col lg={12} className="p-0">
                         <div className="uploadLabel" variant="primary" onClick={handleShow}>
                                    {isUploaded
                                        ?  (<div className="FileName">{t("fileName")} {UploadFileName.name}</div>) 
                                        :   <>
                                             <span>{t("uploadFieldText")}</span> 
                                             <span><svg height="17" viewBox="0 0 1792 1792" width="1792"><path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"/></svg></span>
                                            </>
                                    }
                            
                         </div>
                        <Modal show={show} onHide={handleClose}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header closeButton>
                                 <Modal.Title>{t("uploadFieldText")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                { isLoading
                                ? <LoadingSpinner />
                                : <>
                                    {isUploaded
                                        ?  (<div className="FileName">{t("fileName")} {UploadFileName.name}</div>) 
                                        :   <div className="w-100">
                                                <div className="pb-2" style={{color:"#000"}}>{t("allowedFilesimg")}</div>
                                                <input
                                                type="file"
                                                name="attachment"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                />
                                            </div>
                                    }
                                  </>
                                }
                                <input
                                    placeholder="image2"
                                    type="text"
                                    name="image2"
                                    value={image2}
                                    onChange={(e) => setimage2(e.target.value) }
                                    style={{display:"none"}}
                                />
                               <div className="ModalFileBtnCN">
                               { ShowUploadBtn ? <button onClick={uploadImg}>{t("uploadFieldBtnText")}</button> : null}
                               </div>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
                
                <button type="submit">{t("sendBtn")}</button>
                </form>
        </div>
    )
}