import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../Others/Meta";
export default function Projects() {
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
        `${process.env.SERVER_LINK}/api/projects?page=1&limit=${limit}`
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
      `${process.env.SERVER_LINK}/api/projects?page=${currentPage}&limit=${limit}`
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
      <Meta MetaPage="projects" />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle"> المشاريع </div>
          </Col>
        </Row>

        <div className="MediaDirection ProjectsDirection">
          <Row>
            {items.map((data) => {
              return (
                <Col key={data.id} lg={6} sm={6}>
                  <div className="HomeMediaImage ProjectMainImg">
                    <Image width={500} height={500} src={data.image1URL} alt={data.alt1} />
                  </div>
                  <div className="GalleryTitle">{data.title}</div>
                  <div className="GalleryDevider"></div>
                  <div className="ProjectLink">
                    <div className="GalleryDate">{data.address}</div>
                    <div className="CeoLink">
                      <Link href={`/ProjectDetails/${data.id}`}>
                        المزيد من التفاصيل
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
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
