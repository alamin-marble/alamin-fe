import { useState , useEffect } from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Image from 'next/image';

export default function Services() {
    const [t] = useTranslation();
    const [Services , setServices] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/services/lang?lang=${i18n.language}`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setServices(res.data);
        })
        
    }, [])


    return (
    
            <div className="AboutServicesCN-Inner">
              
                <div className="AboutIconsCN">

                    <Row>
                    
                    <Col lg={1} className="p-0"></Col>
                    <Col lg={3} className="p-0">
                        <div className="ServicesSubtitle-CN">
                            <div className="VisionMissionTitle">{t("services")}</div>
                            <div className="ServicesSubtitle">{t("homeServicesDesc")}</div>
                        
                        </div>
                    </Col>
                    <Col lg={2} className="p-0"></Col>
                    <Col lg={6} className="p-0">
                        <div className="ServicesIconsCN">
                            {
                                Services?.data?.map((data , i) => {
                                    return (
                                        <div className="ServicesInfo" key={i}>
                                            <div className="ServicesIcon"><Image loading="eager" width={100} height={100} src={data.Image.url} alt={data.Image.alt} /> </div>
                                            <div className="ServicesName">{data.title}</div>
                                        </div>
                                    )
                                    })
                            }
                        </div>
                    </Col>
                    </Row>
                </div>
                
            </div>
    
    );
}