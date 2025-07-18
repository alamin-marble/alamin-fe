import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import "../../../";
import ConsultingForm from "./Sections/ConsultingForm";
import { useEffect } from "react";
import Meta from "../../Others/Meta";
export default function Consulting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="webPageCn">
      <Meta MetaPage="consultation" />
      <Navbar InPage="Contact" />

      <section>
        <div className="AboutSectionInner">
          <div className="ConsultingCN">
            <div className="HomeMediaTitle AboutPad">استشارات </div>
            <div className="HomeMediaDesc">
              تعتبر شركة رخام الأمين التجارية من أكثر مصانع الرخام التي تسعى
              لفهم متطلبات العميل بهدف تقديم أفضل خدمة ممكنة وتأمين النوع الأفضل
              للرخام والجرانيت المطلوب من قبل عملائها بأفضل جودة وكلفة ممكنة.
              ولخدمتكم بشكل أدق يرجى من حضرتكم تعبئة النموذج التالي، وسيقوم أحد
              مستشارين الرخام لدينا بالتواصل معكم لترتيب موعد.
            </div>

            <ConsultingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
