import PageLoading from "@/components/Others/PageLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomeCEO from "../components/Home/Sections/HomeCEO";
import HomeConsultation from "../components/Home/Sections/HomeConsultation";
import HomeMedia from "../components/Home/Sections/HomeMedia";
import HomeProductsMostSale from "../components/Home/Sections/HomeProductsMostSale";
import HomeProductsRecentlyView from "../components/Home/Sections/HomeProductsRecentlyView";
import HomeServices from "../components/Home/Sections/HomeServices";
import HomeSlider from "../components/Home/Sections/HomeSlider";
import HomeSpecialRock from "../components/Home/Sections/HomeSpecialRock";
import Navbar from "../components/Navbar/nav";
import Meta from "../components/Others/Meta";
 
function Index({ sliderData, ceoData, servicesData, productsData, RecentProductsData, MetaData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Meta MetaData={MetaData} />
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <div className={"Main-Body"}>
            <Navbar InPage="Home" />
            <div className="Left-Body">
              <section>
                <HomeSlider sliderData={sliderData} />
              </section>
              <section style={{ overflow: "hidden" }}>
                <HomeCEO ceoData={ceoData} />
              </section>
              <section style={{ overflow: "hidden" }}>
                <HomeServices servicesData={servicesData} />
              </section>
              <section style={{ overflow: "hidden" }}>
                <HomeProductsMostSale productsData={productsData} />
              </section>
              <section style={{ overflow: "hidden" }}>
                <HomeConsultation />
              </section>
              <section style={{ overflow: "hidden" }}>
                <HomeProductsRecentlyView RecentProductsData={RecentProductsData} />
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
        </>
      )}
    </div>
  );
}

export default Index;

export const getServerSideProps = async ({ locale }) => {

  try { 
    const [sliderResponse, ceoResponse, productsResponse, RecentProductsResponse, MetaResponse] = await Promise.all([
      axios.get(`${process.env.SERVER_LINK}/api/banners/lang?lang=${locale}`),
      axios.get(`${process.env.SERVER_LINK}/api/about/lang?lang=${locale}`),
      
      axios.post(`${process.env.SERVER_LINK}/api/products/filter`, {
        limit: 100,
        offset: 0,
        most_selling: 1,
      }),
       
      axios.post(`${process.env.SERVER_LINK}/api/products/filter`, {
        limit: 100,
        offset: 0,
        new_arrival: 1,
      }),
      axios.get(`${process.env.SERVER_LINK}/api/metaTags/lang?lang=${locale}&page=home`),
    ]);
    const sliderData = sliderResponse.data;
    const ceoData = ceoResponse.data;
    const productsData = productsResponse.data;
    const RecentProductsData = RecentProductsResponse.data;
    const MetaData = MetaResponse.data;

    return {
      props: {
        sliderData,
        ceoData,
        productsData,
        RecentProductsData,
        MetaData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        sliderData: [],
        ceoData: [],
        productsData: [],
        RecentProductsData: [],
        MetaData: null,
      },
    };
  }
  
};
