import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect , useMemo } from "react";
import Navbar from "@/components/Navbar/nav";
import Footer from "@/components/Footer";
import MetaData from "@/components/Others/MetaData";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Link from "next/link";
import Image from 'next/image';
import Fancybox from "@/components/Others/Fancybox";
function ProjectDetails({ projectData }) {
  const [t] = useTranslation();
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ProjectDetails, setProjectDetails] = useState();
 
 



  useEffect(() => {
    if (projectData) 
    {
      setProjectDetails(projectData);
    }
  }, [projectData]);

 
 if(projectData?.products != null)
 {
  let idArr = projectData?.products;
  let titleArr = projectData?.products_title;
  let titleEnArr = projectData?.products_titleEn;
  
  
var items = idArr?.map((id, index) => {
 
  return { 
    id: id,
    title: titleArr[index],
    titleEn: titleEnArr[index],
    link: `/ProductsDetails/`+ id
  }
 
});
 }

 
console.log("project data",projectData)
  return (
    <div className="webPageCn">
      {!!ProjectDetails && (
        <MetaData
          title={ProjectDetails.metaTitle}
          description={ProjectDetails.metaDesc}
          image={""}
        ></MetaData>
      )}
      <Navbar InPage="Project" />

      <div className="PageInner">
        <Row>
          <Col lg={12} className="p-0">
            {!!ProjectDetails && (
              <>
                <Row className="ProjectDetailsCN" key={ProjectDetails.id}>
                  <Col lg={12} className="p-0">
                    <div className="ProjectTitleWithDate">
                      <div className="ManufactureTitle  ProjectDetailsTitle">
                        {i18n.language === "ar" ? ProjectDetails.title : ProjectDetails.titleEn}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="m-0">
                  <Col lg={7} className="ProjectDetailsFlex">
                    <div className="ProjectInformation">
                      <div className="ProjectDevider"></div>
                      <div className="ProjectAddress">
                        {" "}
                        {i18n.language === "ar" ? ProjectDetails.address : ProjectDetails.addressEn}{" "}
                      </div>
                      <div className="ProjectDetails">
                        {i18n.language === "ar" ? ProjectDetails.details : ProjectDetails.detailsEn}{" "}
                      </div>
                      <div className="ProjectYear">
                        <span>{t("supplyYear")} : </span>{" "}
                        <span className="bold">
                          {ProjectDetails.yearOfSupply}
                        </span>
                      </div>
                      <div className="ProjectYear">
                        <span>{t("contractor")} : </span>{" "}
                        <span className="bold">
                         {i18n.language === "ar" ? ProjectDetails.contractor : ProjectDetails.contractorEn}
                        </span>
                      </div>
                      <div className="ProjectYear">
                        <span>{t("owner")} : </span>{" "}
                        <span className="bold">{i18n.language === "ar" ? ProjectDetails.owner : ProjectDetails.ownerEn}</span>
                      </div>

                      <div id="productUsedCN" className={ProjectDetails.products.length === 0 ? "ProjectYear dis-none" : "ProjectYear"}>
                        <span>{t("productsUsed")} : </span>{" "}
                        <span className="bold" id="productUsed">{/*<Link href={data.id}>{ProjectDetails.products_title}</Link>*/}
                        {items?.map(
                                (product , i , row) => {
                                  return (
                                    <Link key={i} href= {product.link.toString()}>{i18n.language === "ar" ? product.title : product.titleEn}</Link>
                                  );
                                }
                              )}
                          
                        </span>
                      </div>

                    </div>
                    <Fancybox>
                      <div data-fancybox="Projects" href={ProjectDetails.image2URL} className="h-100">
                        <div className="ProjectFImage">
                          <Image
                            loading="eager"
                            width={500}
                            height={500}
                            src={ProjectDetails.image2URL}
                            alt={ProjectDetails.alt2}
                          />
                        </div>
                      </div>
                    </Fancybox>
                  </Col>
                  <Col lg={5}>
                  <Fancybox>
                  <div data-fancybox="Projects" href={ProjectDetails.image3URL} className="h-100">
                    <div className="ProjectSImage">
                      <Image
                        loading="eager"
                        width={500}
                        height={500}
                        src={ProjectDetails.image3URL}
                        alt={ProjectDetails.alt3}
                      />
                    </div>
                  </div>
                  </Fancybox>
                  </Col>
                </Row>
                <Row className="m-0 bottomProject">
                  <Col lg={12}>
                   <Fancybox>
                      <div data-fancybox="Projects" href={ProjectDetails.image1URL}  className="h-100">
                          <div className="ProjectLImage">
                            <Image
                              loading="eager"
                              width={500}
                              height={500}
                              src={ProjectDetails.image1URL}
                              alt={ProjectDetails.alt1}
                            />
                          </div>
                      </div>
                    </Fancybox>
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
  );
}

export default ProjectDetails;

export async function getServerSideProps({ query }) {
  try {
    const { id } = query;
    const projectDetailsRes = await axios.get(
      `${process.env.SERVER_LINK}/api/projects/${id}`
    );
    const projectData = projectDetailsRes.data;
    return {
      props: {
        projectData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        projectData: null,
      },
    };
  }
}