import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import ManufactureIntro from "./Sections/ManufactureIntro";
import Branches from "./Sections/Branches";
import Warehouses from "./Sections/Warehouses";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Link from "next/link";
export default function Manufacture() {
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
        }, 1300);
      }
    }

    scrollView();
  }, [location]);

  return (
    <div className="webPageCn">
      <Navbar InPage="About" />

      <div className="PageInner">
        <div className="HomeMediaTitle AboutPad">من نحن</div>
        <div className="AboutMenu">
          <ul>
            <li>
              <Link href="/About">المقدمة</Link>
            </li>
            <li>
              <Link state={{ from: "CEO" }} href="/About">
                كلمة المدير
              </Link>
            </li>
            <li>
              <Link state={{ from: "VisionMission" }} href="/About">
                الرؤية
              </Link>
            </li>
            <li>
              <Link state={{ from: "VisionMission" }} href="/About">
                الرسالة
              </Link>
            </li>
            <li>
              <Link state={{ from: "philosophy" }} href="/About">
                فلسفتنا
              </Link>
            </li>
            <li>
              <Link href="/Journey">رحلتنا</Link>
            </li>
            <li>
              <Link href="/Manufacture">المصنع</Link>
            </li>
            <li>
              <Link href="/Manufacture#branches">الفروع</Link>
            </li>
            <li>
              <Link href="/Manufacture#warehouse">المستودعات</Link>
            </li>
          </ul>
        </div>

        <section id="intro">
          <ManufactureIntro />
        </section>
      </div>

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
