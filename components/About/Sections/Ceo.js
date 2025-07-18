import i18n from "@/i18n";
import axios from "axios";
import { useState , useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from "react-i18next";
import Image from "next/image";
export default function CEO() {
    const [t] = useTranslation();
    const [CEODetails , setCEODetails] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/about/lang?lang=${i18n.language}&offset=0&limit=10`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setCEODetails(res.data);
        })
        
    }, [])



    return(
        <>
            {CEODetails?.data?.map((data , i) => {
                return(
                    <Row className="m-0 align-items-center AboutCEOCN" key={i}>
                        <Col lg="4" className="p-0">
                            <div className="AboutCeoImg"><Image loading="eager" width={700} height={700} src={data.Image.url} alt={data.Image.alt} /></div>
                        </Col>
                        <Col lg="1" className="p-0"></Col>
                        <Col lg="5" className="p-0">
                                <div className="AboutIntroTitle">{t("aboutIntroTitle")}</div>
                                <div className="AboutIntroDescription">{data.ceoText}</div>
                                <div className="CeoSectionName">{data.ceoName}</div>
                        </Col>
                    </Row>
                 )
            })}
        </>
    )
}