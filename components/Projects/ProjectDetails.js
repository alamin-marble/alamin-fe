import React from "react"
import {useParams} from "react-router-dom"
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState , useEffect } from 'react';
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer";
import Image from 'next/image';
function ProjectDetails() {
 
    useEffect(() => {
        window.scrollTo(0,0)
      },[])

    const {ProjectID} = useParams()
    const [ProjectDetails , setProjectDetails] = useState();
 
 
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/projects/${ProjectID}`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setProjectDetails(res.data);
      
        })
        
    }, [ProjectID])


 

    
    return (
        <div className="webPageCn">
            <Navbar   InPage="Project"/>
        
            <div className="PageInner">
                <Row>
                    
                    <Col lg={12} className="p-0">
                        { !!ProjectDetails && (
                            <>
                            <Row className="ProjectDetailsCN" key={ProjectDetails.id}>
                                <Col lg={12} className="p-0">
                                    <div className="ProjectTitleWithDate">
                                            <div className="ManufactureTitle  ProjectDetailsTitle">
                                                {ProjectDetails.title}
                                            </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="m-0">
                                    <Col lg={7} className="ProjectDetailsFlex">
                                        <div className="ProjectInformation">
                                                <div className="ProjectDevider"></div>
                                                <div className="ProjectAddress"> {ProjectDetails.address} </div>
                                                <div className="ProjectDetails">{ProjectDetails.details} </div>
                                                <div className="ProjectYear"><span>سنة التوريد : </span> <span className="bold">{ProjectDetails.yearOfSupply}</span></div>
                                                <div className="ProjectYear"><span>المقاول : </span> <span className="bold">{ProjectDetails.contractor}</span></div>
                                                <div className="ProjectYear"><span>المالك : </span> <span className="bold">{ProjectDetails.owner}</span></div>
                                        </div>
                                        <div className="ProjectFImage">
                                            <Image loading="eager" width={500} height={500} src={ProjectDetails.image2URL} alt={ProjectDetails.alt2} />
                                        </div>
                                    </Col>
                                    <Col lg={5}>
                                        <div className="ProjectSImage">
                                            <Image loading="eager" width={500} height={500} src={ProjectDetails.image3URL} alt={ProjectDetails.alt3} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="m-0 bottomProject">
                                    <Col lg={12}>
                                        <div className="ProjectLImage">
                                            <Image loading="eager" width={500} height={500} src={ProjectDetails.image1URL} alt={ProjectDetails.alt1} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            
                            
                        )}
                    </Col>
                    <Col lg={4} className="p-0"></Col>
                </Row>
            </div>
            
                
      
           
           <Footer />
        </div>
    )
}

export default ProjectDetails