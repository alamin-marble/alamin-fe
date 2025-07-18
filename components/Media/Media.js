import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../";
import { useParams } from "react-router-dom";
import Link from "next/link";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer";
import ReactPaginate from "react-paginate";
import Meta from "../../Others/Meta";
import Image from 'next/image';
export default function Media() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { type } = useParams();

  const [items, setItem] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 4;

  useEffect(() => {
    const getApiRespose = async () => {
      const res = await fetch(
        `${process.env.SERVER_LINK}/api/mediaCenter/?mediaCategoryID=${type}&page=1&limit=${limit}`
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
    return str.length > 250 ? str.slice(0, 250 - 1) + "..." : str;
  }

  return (
    <div className="webPageCn">
      <Meta MetaPage={type === "1" ? "news" : "blog"} />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle">
              {" "}
              المركز الإعلامي |{" "}
              <span>{type === "1" ? "الأخبار" : "المقالات"}</span>{" "}
            </div>
          </Col>
        </Row>
        <div className="MediaDirection">
          {items.map((data) => {
            return (
              <Row key={data.id}>
                <Col lg={7}>
                  <div className="HomeMediaImage">
                    <Image loading="eager" width={500} height={500} src={data.imageURL} alt={data.alt} />
                  </div>
                </Col>
                <Col lg={1}></Col>
                <Col lg={4}>
                  <div className="HomeMediaInfo">
                    <div className="HomeMediaInnerTitle">{data.title}</div>
                    <div className="HomeMediaDesc">
                      {truncate(data.description)}
                    </div>
                    <div className="CeoLink">
                      <Link href={`/MediaDetails/${data.id}`}>
                        المزيد من التفاصيل
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>

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
