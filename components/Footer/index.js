import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FooterSocial from "./FooterSocial";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { imageLoader } from "@/components/utils";

export default function Footer() {
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.asPath, router.asPath, { locale: lng });

    if (lng === "en") {
      document.getElementById("lngTop").setAttribute("dir", "ltr");
    } else {
      document.getElementById("lngTop").setAttribute("dir", "rtl");
    }
  };
  return (
    <div className="FooterCN">
      <div className="FooterLine"></div>

      <div className="FooterBottom">
        <Row>
          <Col lg={2} className="p-0">
            <div className="FooterLogo">
              <Image loading="eager" width={138} height={86} src="/assets/static/logo.png" alt="footer logo" loader={imageLoader}/>{" "}
            </div>
          </Col>
          <Col lg={10} className="p-0">
            <div className="FooterContent">
              <div className="footerSocial">
                <FooterSocial />
              </div>

              <div className="footerMenu">
                <ul>
                  <li>
                    <Link href="/About">{t("about")}</Link>
                  </li>
                  <li>
                    <Link href="/Consulting">{t("consultation")}</Link>
                  </li>
                  <li>
                    <Link href="/Products">{t("orderNow")}</Link>
                  </li>
                  <li>
                    <Link href="/Products">{t("products")} </Link>
                  </li>
                  <li>
                    <Link href="/Careers">{t("careers")} </Link>
                  </li>
                  <li>
                    <Link href="/Contact">{t("contact")}</Link>
                  </li>
                  <li>
                    <div className="FooterLang">
                      <ul>
                        <li>
                          <button onClick={() => changeLanguage("en")}>En</button>
                        </li>
                        <li>|</li>
                        <li>
                        <button onClick={() => changeLanguage("ar")}>Ar</button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="FooterRights">
        © AlAmin. 2022. all rights are resirved!
      </div>
    </div>
  );
}
