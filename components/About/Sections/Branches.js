import { useState , useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import i18n from "@/i18n";
import Image from "next/image";
export default function Branches() {


    const [Branches , setBranches] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/factory/2`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setBranches(res.data);
        })
        
    }, [])

 
    return(
             <div className="PageInner">
                   
                        { !!Branches && (
                            <>
                                <Row className="m-0">
                                    <Col lg={12}>
                                        <div className="ManufactureTitle BranchPad">
                                           {i18n.language === "ar" ? Branches.title : Branches.titleEn}  
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="m-0">
                                    <Col lg={7}>
                                        <div className="BranchImage">
                                            <Image loading="eager" width={500} height={500} src={Branches.image1URL} alt={Branches.image1Alt} />
                                        </div>
                                    </Col>
                                    <Col lg={5} className="ManfDetailsFlex">
                                        <div className="BranchImage">
                                            <Image loading="eager" width={500} height={500} src={Branches.image2URL} alt={Branches.image2Alt} />
                                        </div>
                                        <div className="BranchImage">
                                            <Image loading="eager" width={500} height={500} src={Branches.image3URL} alt={Branches.image3Alt} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            )
                        }
             </div>
    )
}