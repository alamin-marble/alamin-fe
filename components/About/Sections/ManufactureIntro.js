import { useState , useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import i18n from "@/i18n";
import Image from 'next/image';
export default function ManufactureIntro() {


    const [ManufactureDetails , setManufactureDetails] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/factory/1`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setManufactureDetails(res.data);
        })
        
    }, [])

 
    return(
             <div>
                   
                        { !!ManufactureDetails && (
                            <>
                                <Row className="m-0">
                                    <Col lg={12}>
                                        <div className="ManufactureTitle">
                                          {i18n.language === "ar" ? ManufactureDetails.title : ManufactureDetails.titleEn}  
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="m-0">
                                    <Col lg={5} className="ManfDetailsFlex">
                                        <div className="ManufactureDescription">
                                       {i18n.language === "ar" ? ManufactureDetails.text : ManufactureDetails.textEn}  
                                        </div>
                                        <div className="ManufactureFImage">
                                            <Image loading="eager" width={500} height={500} src={ManufactureDetails.image2URL} alt={ManufactureDetails.image2Alt} />
                                        </div>
                                    </Col>
                                    <Col lg={7}>
                                        <div className="ManufactureFImage">
                                            <Image loading="eager" width={500} height={500} src={ManufactureDetails.image1URL} alt={ManufactureDetails.image1Alt} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            )
                        }
                  
             </div>
    )
}