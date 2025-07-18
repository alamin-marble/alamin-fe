import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer";
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import metaLogo from '../../../static/Alamin-Logo-Share.jpg';
import HelmetMetaData from "../../Others/HelmetMetaData";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Image from 'next/image';

function MediaDetails() {
  const { MediaID } = useParams();
  const [MediaDetails, setMediaDetails] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_LINK}/api/mediaCenter/${MediaID}`)
      .then((res) => {
        //const emps = res.data;
        //this.setState({ emps });
        setMediaDetails(res.data);
      });
  }, [MediaID]);

  function formatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" }; //month : long
    return new Date(string).toLocaleDateString("ar-en", options);
  }

  return (
    <div className="webPageCn">
      {!!MediaDetails && (
        <HelmetMetaData
          title={MediaDetails.title}
          description={MediaDetails.description}
          image={MediaDetails.imageURL}
        ></HelmetMetaData>
      )}

      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={2} className="p-0"></Col>
          <Col lg={8} className="p-0">
            {!!MediaDetails && (
              <Row className="MediaDetailsCN" key={MediaDetails.id}>
                <Col lg={12} className="p-0">
                  <div className="MediaTitleWithDate">
                    <div className="MediaDetailsTitle">
                      {MediaDetails.title}
                    </div>
                    <div className="MediaDetailsDate">
                      {formatDate(MediaDetails.mediaDate)}
                    </div>
                  </div>
                </Col>
                <Col lg={12} className="p-0">
                  <div className="MediaDetailsImage">
                    <Image loading="eager" width={500} height={500} src={MediaDetails.imageURL} alt={MediaDetails.alt} />
                  </div>
                </Col>
                <Col lg={12} className="p-0">
                  <div className="ProductShareSocial MediaShare">
                    <div className="ProductShareSocialTitle">
                      شارك على وسائل التواصل الاجتماعي:{" "}
                    </div>
                    <ul>
                      <li>
                        <WhatsappShareButton
                          url={`${window.location.href}`}
                          quote={`${MediaDetails.title}`}
                        >
                          <svg
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="2 2 21 21"
                          >
                            <title>Whatsapp</title>
                            <path d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9" />
                          </svg>
                        </WhatsappShareButton>
                      </li>
                      <li>
                        <FacebookShareButton
                          url={`${window.location.href}`}
                          quote={`${MediaDetails.title}`}
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Facebook</title>
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </FacebookShareButton>
                      </li>
                      <li>
                        <TwitterShareButton
                          url={`${window.location.href}`}
                          quote={`${MediaDetails.title}`}
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Twitter</title>
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </TwitterShareButton>
                      </li>
                      <li>
                        <LinkedinShareButton
                          url={`${window.location.href}`}
                          quote={`${MediaDetails.title}`}
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>LinkedIn</title>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </LinkedinShareButton>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={12} className="p-0">
                  <div className="MediaDetailsDescription">
                    {MediaDetails.description}
                  </div>
                </Col>
              </Row>
            )}
          </Col>
          <Col lg={2} className="p-0"></Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
}

export default MediaDetails;
