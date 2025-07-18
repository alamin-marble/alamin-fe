import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer";
import ReactPaginate from "react-paginate";
import Fancybox from "../../Others/Fancybox.js";
import Meta from "../../Others/Meta";
import Image from 'next/image';
export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { type } = useParams();

  const [items, setItem] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 6;

  useEffect(() => {
    const getApiRespose = async () => {
      const res = await fetch(
        `${process.env.SERVER_LINK}/api/photoGallery?lang=ar&page=1&limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItem(data);
    };
    getApiRespose();
  }, [limit, type]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `${process.env.SERVER_LINK}/api/photoGallery?lang=ar&page=${currentPage}&limit=${limit}`
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
      <Meta MetaPage="photogallary" />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle">
              {" "}
              المركز الإعلامي | <span>معرض الصور</span>{" "}
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
                        <Image loading="eager" width={100} height={100} src={data.imageURL} alt={data.alt} />{" "}
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
          previousLabel={"السابق"}
          nextLabel={"التالي"}
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
