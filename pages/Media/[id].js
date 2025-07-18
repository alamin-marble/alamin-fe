import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";
import Navbar from "@/components/Navbar/nav";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import Meta from "@/components/Others/Meta";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function Media({ mediaData, metaData, type, limit, pageCount }) {
 
  const [t] = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [items, setItem] = useState([]);

  useEffect(() => {
    setItem(mediaData);
  }, [mediaData]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `${process.env.SERVER_LINK}/api/mediaCenter/?mediaCategoryID=${type}&page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handleClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItem(commentsFormServer);
  };

  function truncate(str) {
    if(str){
      return str.length > 250 ? str.slice(0, 250 - 1) + "..." : str;
    }
  }
   return (
    <div className="webPageCn">
      <Meta MetaData={metaData} />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle">
             {t("mediaCenter")}  |{" "}
              <span>{type === "1" ? t("news") : t("blogs")}</span>{" "}
            </div>
          </Col>
        </Row>
        <div className="MediaDirection">
          {items.map((data) => {
            return (
              <Row key={data.id}>
                <Col lg={7}>
                  <div className="HomeMediaImage">
                    <Image width={500} height={500} src={data.imageURL} alt={data.altImage} />
                  </div>
                </Col>
                <Col lg={1}></Col>
                <Col lg={4}>
                  <div className="HomeMediaInfo">
                    <div className="HomeMediaInnerTitle"> {i18n.language === "ar" ? data.title : data.titleEn} </div>
                    <div className="HomeMediaDesc">
                       <div dangerouslySetInnerHTML={{ __html: i18n.language === "ar" ? truncate(data.description) : truncate(data.descriptionEn) }} /> 
                      {/* {i18n.language === "ar" ? truncate(data.description) : truncate(data.descriptionEn)} */}
                    </div>
                    <div className="CeoLink">
                      <Link href={`/MediaDetails/${data.slug}/${data.id}`}>
                      {t("moreDetails")}
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>

        <ReactPaginate
          previousLabel={t("prevPagination")}
          nextLabel={t("nextPagination")}
          breakLabel={"..."}
          pageCount={Math.ceil(pageCount)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={0}
          onPageChange={handleClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-linkNum2 hide-page-numbers"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          renderPageNumbers={() => null} // Customize to hide page numbers
        />
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query , locale }) {
     const { id } = query;
     const limit = 4;
     
  try {
    const [mediaRes, metaRes] = await Promise.all([
      axios.get(
        `${process.env.SERVER_LINK}/api/mediaCenter/?mediaCategoryID=${id}&page=1&limit=${limit}`, {timeout: 15000 }
      ),
      axios.get(
        `${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=${id === "1" ? "news" : "blog"}`, {timeout: 15000 }
      ),
    ]);
    const mediaData = mediaRes.data;
    const total = mediaRes.headers["x-total-count"];
 
    const pageCount = Math.ceil(total / limit);
    const metaData = metaRes.data;
    return {
      props: {
        mediaData,
        pageCount,
        type: id,
        metaData,
        limit, 
      },
    };
  } catch (error) { 
    console.log(error);
    return {
      props: {
        mediaData: [],
        pageCount: 0,
        type: id,
        metaData: null,
        limit, 
      },
    };
  }
}
