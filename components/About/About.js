import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import "../../../";
import Introduction from "./Sections/Introduction";
import CEO from "./Sections/Ceo";
import VisionMission from "./Sections/VisionMission";
import Philosophy from "./Sections/Philosophy";
import Services from "./Sections/Services";
import Journey from "./Sections/Journey";
import ManufactureIntro from "./Sections/ManufactureIntro";
import Branches from "./Sections/Branches";
import Warehouses from "./Sections/Warehouses";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import Meta from "../../Others/Meta";
export default function About() {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function HandleScrollToTop() {
    window.scrollTo(0, 0);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    function scrollView() {
      const direction = location?.state?.from;

      const elem = document.getElementById(direction);

      if (elem) {
        if (direction === "introduction") {
          window.scrollTo(0, 0);
        } else {
          setTimeout(() => {
            elem.scrollIntoView({ behavior: "smooth" });
          }, 1500);
        }
      }
    }

    scrollView();
  }, [location]);

  const [isOpen, setisOpen] = useState(false);

  const isNavOpen = (event) => {
    setisOpen((current) => !current);
  };

  return (
    <div className="webPageCn">
      <Meta MetaPage="about" />
      <Navbar InPage="About" />

      <section id="introduction">
        <div className="AboutSectionInner">
          <div className="HomeMediaTitle AboutPad">من نحن</div>
          <button
            className={isOpen ? "AbouNavBtn AbouNavBtnOpened" : "AbouNavBtn"}
            onClick={isNavOpen}
          ></button>
          <div className={isOpen ? "AboutMenu OpenFixed" : "AboutMenu"}>
            <ul>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#introduction"
                >
                  المقدمة
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#CEO"
                >
                  كلمة المدير
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#VisionMission"
                >
                  الرؤية
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#VisionMission"
                >
                  الرسالة
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#philosophy"
                >
                  فلسفتنا
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#Journey"
                >
                  رحلتنا
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#Manufacture"
                >
                  المصنع
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#branches"
                >
                  الفروع
                </HashLink>
              </li>
              <li>
                <HashLink
                  scroll={(el) => scrollWithOffset(el)}
                  onClick={isNavOpen}
                  href="/About#warehouse"
                >
                  المستودعات
                </HashLink>
              </li>
            </ul>
          </div>

          <Introduction />
        </div>
      </section>

      <div id="scroller" className="arrow-up dNone" onClick={HandleScrollToTop}>
        <span className="left-arm"></span>
        <span className="right-arm"></span>
        <span className="arrow-slide"></span>
      </div>

      <section id="CEO">
        <div className="ColoredBG">
          <div className="AboutSectionInner">
            <CEO />
          </div>
        </div>
      </section>

      <section id="VisionMission">
        <div className="AboutCenterSection">
          <VisionMission />
        </div>
      </section>

      <section id="philosophy">
        <div className="ColoredBG">
          <div className="PhilosophyInner">
            <Philosophy />
          </div>
        </div>
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="Journey">
        <div className="ColoredBG">
          <Journey />
        </div>
      </section>

      <section id="Manufacture">
        <div className="AboutCenterSection">
          <ManufactureIntro />
        </div>
      </section>

      <section id="branches" className="ColoredBG">
        <Branches />
      </section>

      <section id="warehouse">
        <Warehouses />
      </section>

      <Footer />
    </div>
  );
}
