import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Branches from "../components/About/Sections/Branches";
import CEO from "../components/About/Sections/Ceo";
import Introduction from "../components/About/Sections/Introduction";
import Journey from "../components/About/Sections/Journey";
import ManufactureIntro from "../components/About/Sections/ManufactureIntro";
import Philosophy from "../components/About/Sections/Philosophy";
import Services from "../components/About/Sections/Services";
import VisionMission from "../components/About/Sections/VisionMission";
import Warehouses from "../components/About/Sections/Warehouses";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/nav";
import Meta from "../components/Others/Meta";
 
export default function About({ MetaData }) {
  const [isLoading, setIsLoading] = useState(true);

  const [t] = useTranslation();
  let location = useRouter();
 
  useEffect(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  function HandleScrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    function scrollView() {
      const direction = location?.query?.from;

      const elem = document.getElementById(direction);
      if (elem) {
        if (direction === "introduction") {
          window.scrollTo(0, 0);
        } else {
          setTimeout(() => {
            elem.scrollIntoView({ block: "start" , behavior: "smooth" });
          }, 2300);
        }
      }
    }

    scrollView();
    
  }, [location]);


  

  const [isOpen, setisOpen] = useState(false);
  const isNavOpen = (event,element) => {
    setisOpen((current) => !current); 
    event.preventDefault(); // Prevent the default behavior of clicking on a link
    const section = document.getElementById(element);
    if (section) {
      section.scrollIntoView({ block: "start" , behavior: 'smooth' }); // Scroll to the section
    }
  };

  return (
    <div className="webPageCn">
      <Meta MetaData={MetaData} />

      <Navbar InPage="About" />

      <section id="introduction">
        <div className="AboutSectionInner">
          <div className="HomeMediaTitle AboutPad">{t("about")}</div>
          <button className={isOpen ? "AbouNavBtn AbouNavBtnOpened" : "AbouNavBtn"} onClick={isNavOpen}></button>
          <div className={isOpen ? "AboutMenu OpenFixed" : "AboutMenu"}>
            <ul>
              <li>
                <Link onClick={(e) => isNavOpen(e,"introduction")}  href="" scroll={false}>
                  {t("introduction")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"CEO")}  href=""  scroll={false}>
                  {t("ceoWord")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"VisionMission")}  href="" scroll={false}>
                  {t("vision")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"VisionMission")}  href=""  scroll={false}>
                  {t("mission")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"philosophy")}  href=""  scroll={false}>
                  {t("philosophy")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"Journey")}  href="" scroll={false}>
                  {t("journey")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"Manufacture")}  href=""  scroll={false}>
                  {t("factory")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"branches")}  href=""  scroll={false}>
                  {t("branches")}
                </Link>
              </li>
              <li>
                <Link onClick={(e) => isNavOpen(e,"warehouse")}  href=""  scroll={false}>
                  {t("warehouses")}
                </Link>
              </li>
            </ul>
          </div>

          <Introduction />
        </div>
      </section>

      <div className="clear"></div>

      <div id="scroller" className="arrow-up dNone" onClick={HandleScrollToTop}>
        <span className="left-arm"></span>
        <span className="right-arm"></span>
        <span className="arrow-slide"></span>
      </div>

      <div className="clear"></div>

      <section id="CEO">
        <div className="ColoredBG">
          <div className="AboutSectionInner">
            <CEO />
          </div>
        </div>
      </section>

      <div className="clear"></div>

      <section id="VisionMission">
        <div className="AboutCenterSection">
          <VisionMission />
        </div>
      </section>

      <div className="clear"></div>

      <section id="philosophy">
        <div className="ColoredBG">
          <div className="PhilosophyInner">
            <Philosophy />
          </div>
        </div>
      </section>

      <div className="clear"></div>

      <section id="services">
        <Services />
      </section>

      <div className="clear"></div>

      <section id="Journey">
        <div className="ColoredBG">
          <Journey />
        </div>
      </section>

      <div className="clear"></div>

      <section id="Manufacture">
        <div className="AboutCenterSection">
          <ManufactureIntro />
        </div>
      </section>

      <div className="clear"></div>

      <section id="branches" className="ColoredBG">
        <Branches />
      </section>

      <div className="clear"></div>

      <section id="warehouse">
        <Warehouses />
      </section>

      <div className="clear"></div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({ locale }) => {
  let props = {};
  try {
    const MetaResponse = await axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=about`);
    const MetaData = MetaResponse.data;

    return {
      props: {
        MetaData,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props,
  };
};
