import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import "../../../";
import Job from "./Sections/Job";
import { useEffect } from "react";
import Meta from "../../Others/Meta";
export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="webPageCn">
      <Meta MetaPage="careers" />
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad">الوظائف الشاغرة </div>

            <Job />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
