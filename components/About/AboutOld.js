import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import Introduction from "./Sections/Introduction";
import CEO from "./Sections/Ceo";
import VisionMission from "./Sections/VisionMission";
import Philosophy from "./Sections/Philosophy";
import Services from "./Sections/Services";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Link from "next/link";
export default function AboutOld() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let location = useLocation();

  useEffect(() => {
    function scrollView() {
      const direction = location?.state?.from;
      const elem = document.getElementById(direction);

      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      }
    }

    scrollView();
  }, [location]);

  return (
    <div className="webPageCn">
      <Navbar InPage="About" />

      <section id="introduction">
        <div className="AboutSectionInner">
          <div className="HomeMediaTitle AboutPad">من نحن</div>
          <div className="AboutMenu">
            <ul>
              <li>
                <Link href="/About">المقدمة</Link>
              </li>
              <li>
                <Link href="/About#CEO">كلمة المدير</Link>
              </li>
              <li>
                <Link href="/About#VisionMission">الرؤية</Link>
              </li>
              <li>
                <Link href="/About#VisionMission">الرسالة</Link>
              </li>
              <li>
                <Link href="/About#philosophy">فلسفتنا</Link>
              </li>
              <li>
                <Link href="/Journey">رحلتنا</Link>
              </li>
              <li>
                <Link href="/Manufacture">المصنع</Link>
              </li>
              <li>
                <Link state={{ from: "branches" }} href="/Manufacture">
                  الفروع
                </Link>
              </li>
              <li>
                <Link state={{ from: "warehouse" }} href="/Manufacture">
                  المستودعات
                </Link>
              </li>
            </ul>
          </div>

          <Introduction />
        </div>
      </section>

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

      <Footer />
    </div>
  );
}
