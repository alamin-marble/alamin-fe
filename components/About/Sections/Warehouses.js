import { useState , useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import i18n from "@/i18n";
import Image from 'next/image';
export default function Warehouses() {


    const [Warehouses , setWarehouses] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/factory/3`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setWarehouses(res.data);
        })
        
    }, [])

 
    return(
             <div className="PageInner">
                   
                        { !!Warehouses && (
                            <>
                                <Row className="m-0">
                                    <Col lg={12}>
                                        <div className="ManufactureTitle">
                                      
                                           {i18n.language === "ar" ? Warehouses.title : Warehouses.titleEn}  
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="m-0">
                                    <Col lg={5} className="ManfDetailsFlex">
                                        <div className="ManufactureDescription">
                                   
                                        {i18n.language === "ar" ? Warehouses.text : Warehouses.textEn}  
                                        </div>
                                        <div className="ManufactureFImage">
                                            <Image loading="eager" width={500} height={500} src={Warehouses.image3URL} alt={Warehouses.image3Alt} />
                                        </div>
                                    </Col>
                                    <Col lg={7}>
                                        <div className="ManufactureFImage">
                                            <Image loading="eager" width={500} height={500} src={Warehouses.image2URL} alt={Warehouses.image2Alt} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="m-0 bottomWarehouse">
                                    <Col lg={12}>
                                        <div className="ManufactureFImage">
                                            <Image loading="eager" width={500} height={500} src={Warehouses.image1URL} alt={Warehouses.image1Alt} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            )
                        }
                  
             </div>
    )
}