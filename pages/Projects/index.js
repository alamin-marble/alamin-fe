import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/nav";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Meta from "@/components/Others/Meta";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function Projects({ projectsData, metaData, pageCountNum }) {
   
  const [t] = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [items, setItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let limit = 4;

  useEffect(() => {
    if (projectsData.length) {
      setPageCount(pageCountNum);
      setItem(projectsData);
    }
  }, [projectsData]);

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
      <Meta MetaData={metaData} />
      <Navbar InPage="Media" />

      <div className="PageInner">
        <Row>
          <Col lg={12}>
            <div className="HomeMediaTitle">  {t("projects")} </div>
          </Col>
        </Row>

        <div className="MediaDirection ProjectsDirection">
          <Row>
            {items.map((data) => {
              return (
                <Col key={data.id} lg={6} sm={6}>
                  <div className="HomeMediaImage ProjectMainImg">
                    <Image loading="eager" width={500} height={500} src={data.image1URL} alt={data.alt1} />
                  </div>
                  <div className="GalleryTitle">  {i18n.language === "ar" ? data.title : data.titleEn}  </div>
                  <div className="GalleryDevider"></div>
                  <div className="ProjectLink">
                    <div className="GalleryDate"> {i18n.language === "ar" ? data.address : data.addressEn} </div>
                    <div className="CeoLink">
                      <Link href={`/ProjectDetails/${data.id}`}>
                        {t("moreDetails")}
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

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
          pageLinkClassName={"page-linkNum"}
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
    let limit = 4;
    const [projectsRes, metaRes] = await Promise.all([
      await axios.get(
        `${process.env.SERVER_LINK}/api/projects?page=1&limit=${limit}`,{timeout:15000}
      ),
      axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=projects`,{timeout:15000}),
    ]);
    console.log("projectsRes" , projectsRes)
    const projectsData = projectsRes.data;
    const metaData = metaRes.data;
    const total = projectsRes.headers["x-total-count"];
    const pageCountNum = Math.ceil(total / limit);
    return {
      props: {
        projectsData,
        metaData,
        pageCountNum,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        projectsData: [],
        metaData: null,
        pageCountNum: 0,
      },
    };
  }
};
