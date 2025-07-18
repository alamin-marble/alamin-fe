import "../../../";
import Navbar from "../../Navbar/nav";
import HomeSlider from "../Home/Sections/HomeSlider";
import HomeCEO from "./Sections/HomeCEO";
import HomeServices from "../Home/Sections/HomeServices";
import HomeProductsMostSale from "../Home/Sections/HomeProductsMostSale";
import HomeConsultation from "../Home/Sections/HomeConsultation";
import HomeProductsRecentlyView from "../Home/Sections/HomeProductsRecentlyView";
import HomeSpecialRock from "../Home/Sections/HomeSpecialRock";
import HomeMedia from "../Home/Sections/HomeMedia";
import Footer from "../../Footer";
import { useEffect } from "react";
import Meta from "../../Others/Meta";
function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Meta MetaPage="home" />

      <div className="Main-Body">
        <Navbar InPage="Home" />
        <div className="Left-Body">
          <section>
            <HomeSlider />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeCEO />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeServices />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeProductsMostSale />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeConsultation />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeProductsRecentlyView />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeSpecialRock />
          </section>
          <section style={{ overflow: "hidden" }}>
            <HomeMedia />
          </section>
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Index;
