import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";
import Meta from "@/components/Others/Meta.js";
import Fancybox from "@/components/Others/Fancybox";
import Navbar from "@/components/Navbar/nav.js";
import Footer from "@/components/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from 'next/image';
export default function Gallery({ galleryData, metaData, pageCount }) {
  const [t] = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [items, setItem] = useState([]);

  useEffect(() => {
    setItem(galleryData);
  }, [galleryData]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `${process.env.SERVER_LINK}/api/photoGallery?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handleClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItem(commentsFormServer);
  };

  return (
    <div className="webPageCn">
      <Meta MetaData={metaData} />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle">
            {t("mediaCenter")}  |{" "}
              <span>{t("gallery")}</span>{" "}
            </div>
          </Col>
        </Row>
        <Fancybox>
          <div className="MediaDirection">
            <Row>
              {items.map((data) => {
                return (
                  <Col key={data.id} lg={6} sm={6}>
                    <div className="HomeMediaImage">
                      <div
                        data-fancybox="Gallery"
                        href={data.imageURL}
                        data-caption={data.title}
                      >
                        {" "}
                        <Image loading="eager" width={300} height={300} src={data.imageURL} alt={data.alt} />{" "}
                      </div>
                    </div>
                    <div className="GalleryTitle">{data.title}</div>
                    <div className="GalleryDevider"></div>
                    <div className="GalleryDate">{data.date}</div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Fancybox>
        <ReactPaginate
          previousLabel={t("prevPagination")}
          nextLabel={t("nextPagination")}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handleClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ query , locale }) => {
  try {
    const limit = 6;

    const [GalleryRes, metaRes] = await Promise.all([
      axios.get(
        `${process.env.SERVER_LINK}/api/photoGallery?lang=${locale}&page=1&limit=${limit}`
      ),
      axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=photogallary`),
    ]);

    const galleryData = GalleryRes.data;
    const metaData = metaRes.data;
    const total = GalleryRes.headers["x-total-count"];
    const pageCount = Math.ceil(total / limit);
    return {
      props: {
        galleryData,
        metaData,
        pageCount,
      },
    };
  } catch (error) {
    return {
      props: {
        galleryData: [],
        metaData: null,
        pageCount: 0,
      },
    };
  }
};
