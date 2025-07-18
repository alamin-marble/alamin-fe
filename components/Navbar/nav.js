import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Social from "../Navbar/social";
import SearchBox from "../Search/searchbox";
import Color from "./Color";
import ColorRes from "./ColorRes";
import Type from "./Type";
import { imageLoader } from '@/components/utils';

function Navbar({ InPage }) {
  const router = useRouter();

  const [t, i18n] = useTranslation();
  useEffect(() => {
    HandleInPage();
  });

  const [InHomePage, setInHomePage] = useState(false);
  const HandleInPage = (event) => {
    if (InPage === "Home") {
      setInHomePage(true);
    }
  };

  const [isActive, setIsActive] = useState(false);
  const [MenuisActive, setMenuisActive] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current);
    setMenuisActive((current) => !current);
  };

  const handleShowSubMenu = (e) => {
    var tabLink = document.querySelectorAll(".TopLevel");

    tabLink.forEach(function (item) {
      item.addEventListener(
        "click",
        function (e) {
          // ADDS AND REMOVES ACTIVE CLASS ON TABLINKS
          tabLink.forEach(function (item) {
            item.classList.remove("show");
          });
          item.classList.add("show");

          // SOMEHOW EQUATE TAB LINKS TO TAB PANES
        },
        false
      );
    });
  };

  const handleShowSubSubMenu = (e) => {
    var elems = document.querySelectorAll(".TopLevel");

    [].forEach.call(elems, function (el) {
      el.classList.remove("show");
    });

    if (e.currentTarget.classList.contains("show")) {
      e.currentTarget.classList.remove("show");
    } else {
      e.currentTarget.classList.add("show");
    }
  };

  const handleShowSecondLevelMenu = (e) => {
    if (e.currentTarget.classList.contains("secondLevel")) {
      e.currentTarget.classList.toggle("show");
    }
  };

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
    <div className={InHomePage ? "Right-Body" : "Right-Body OtherPagesCN"}>
      <div className="menu-inner-cn">
        <div className="menu-fixed">
          <div className="logo">
            <Link href="/"> <Image loading="eager" width={138} height={86} src={'/assets/static/logo.png'} alt="reman logo" loader={imageLoader} /> </Link>
          </div>

          <button className={isActive ? "btn_burger active" : "btn_burger"} onClick={handleClick}>
            <span>Menu</span>
          </button>

          <div className="SearchLangTop">
            <div className="TopLang">
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
            <div className="TopSearch">
              <SearchBox />
            </div>
          </div>

          <nav className={MenuisActive ? "sidebar  active" : "sidebar "}>
            <ul className={InHomePage ? "nav flex-column" : "nav flex-column OtherPagesNav"}>
              <li className="nav-item TopLevel show">
                <Link className="nav-link" href="/">
                  {t("home")}
                </Link>
              </li>
              <li className="nav-item TopLevel" onClick={handleShowSubMenu}>
                <Link className="nav-link" href="/About"  >
                  {t("about")} <b className="float-end" />
                </Link>
                <ul className="submenu dropdown-menu">
                  <li>
                    <Link
                      className="nav-link"
                      href={{
                        pathname: "/About",
                        query: { from: "introduction" },
                      }}
                      shallow
                    >
                      {t("introduction")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      query={{ from: "CEO" }}
                      href={{ pathname: "/About", query: { from: "CEO" } }}
                      shallow
                    >
                      {t("ceoWord")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "VisionMission" }}
                      href={{
                        pathname: "/About",
                        query: { from: "VisionMission" },
                      }}
                      shallow
                    >
                      {t("vision")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "VisionMission" }}
                      href={{
                        pathname: "/About",
                        query: { from: "VisionMission" },
                      }}
                      shallow
                    >
                      {t("mission")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "philosophy" }}
                      href={{
                        pathname: "/About",
                        query: { from: "philosophy" },
                      }}
                      shallow
                    >
                      {t("philosophy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "services" }}
                      href={{ pathname: "/About", query: { from: "services" } }}
                      shallow
                    >
                      {t("services")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "Journey" }}
                      href={{ pathname: "/About", query: { from: "Journey" } }}
                      shallow
                    >
                      {t("journey")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "Manufacture" }}
                      href={{
                        pathname: "/About",
                        query: { from: "Manufacture" },
                      }}
                      shallow
                    >
                      {t("factory")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "branches" }}
                      href={{ pathname: "/About", query: { from: "branches" } }}
                      shallow
                    >
                      {t("branches")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      state={{ from: "warehouse" }}
                      href={{
                        pathname: "/About",
                        query: { from: "warehouse" },
                      }}
                      shallow
                    >
                      {t("warehouses")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item TopLevel">
                <Link className="nav-link" href="/Consulting">
                  {t("consultation")}
                </Link>
              </li>

              <li className="nav-item hasSubmenu TopLevel" onClick={handleShowSubSubMenu}>
                <Link className="nav-link " href="/Products">
                  {t("orderNow")}
                  <b className="float-end" />
                </Link>
                <ul className="submenu dropdown-menu Fsubsub">
                  <li>
                    <Link className="nav-link secondLevel" href="/DirectRequest" onClick={handleShowSecondLevelMenu}>
                      {t("basedOnSource")} <b className="float-end" />
                    </Link>
                    <ul className="submenu dropdown-menu">
                      <li>
                        <Link className="nav-link" href="/DirectRequest">
                          {t("directRequest")}
                        </Link>
                      </li>
                      <li>
                        <Link className="nav-link" href="/Map">
                          {t("countriesReview")}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="nav-link secondLevel" href="/Products" onClick={handleShowSecondLevelMenu}>
                      {t("basedOnColor")}
                      <b className="float-end" />
                    </Link>
                    <ul className="submenu dropdown-menu">
                      <Color />
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item TopLevel" onClick={handleShowSubMenu}>
                <Link className="nav-link" href="/Products">
                  {t("products")} <b className="float-end" />
                </Link>
                <ul className="submenu dropdown-menu">
                  <li>
                    <Link className="nav-link" href="/Products">
                      {t("allProducts")}
                    </Link>
                  </li>
                  <Type />
                </ul>
              </li>

              <li className="nav-item TopLevel">
                <Link className="nav-link" href="/Map">
                  {t("sources")}
                </Link>
              </li>
              <li className="nav-item TopLevel">
                <Link className="nav-link" href="/Projects">
                  {t("projects")}
                </Link>
              </li>
              <li className="nav-item TopLevel" onClick={handleShowSubMenu}>
                <Link className="nav-link" href="/Blog">
                  {t("mediaCenter")} <b className="float-end" />
                </Link>
                <ul className="submenu dropdown-menu">
                  <li>
                    <Link className="nav-link" href="/News">
                      {t("news")}
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/Photo-Gallery">
                      {t("gallery")}
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/Blog">
                      {t("blogs")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item TopLevel" onClick={handleShowSubMenu}>
                <Link className="nav-link" href="/Contact">
                  {t("contact")} <b className="float-end" />
                </Link>
                <ul className="submenu dropdown-menu">
                  <li>
                    <Link className="nav-link" href="/Contact">
                      {t("contact")}
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/Consulting">
                      {t("date")}
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/Careers">
                      {t("careers")}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="multilevel-accordion-menu">
              <ul>
                <li className="Plain-dropdown">
                  <Link href="/">{t("home")} </Link>
                </li>
                <li className="dropdown">
                  <input type="checkbox" />
                  <Link href="" data-toggle="dropdown">
                    {t("about")}
                  </Link>
                  <ul className="dropdown-menu-toggle">
                    <li>
                      <Link state={{ from: "introduction" }} href="/About">
                        {t("introduction")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "CEO" }} href="/About">
                        {t("ceoWord")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "VisionMission" }} href="/About">
                        {t("vision")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "VisionMission" }} href="/About">
                        {t("mission")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "philosophy" }} href="/About">
                        {t("philosophy")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "services" }} href="/About">
                        {t("services")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "Journey" }} href="/About">
                        {t("journey")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "Manufacture" }} href="/About">
                        {t("factory")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "branches" }} href="/About">
                        {t("branches")}
                      </Link>
                    </li>
                    <li>
                      <Link state={{ from: "warehouse" }} href="/About">
                        {t("warehouses")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="Plain-dropdown">
                  <Link href="/Consulting"> {t("consultation")} </Link>
                </li>

                <li className="dropdown">
                  <input type="checkbox" />
                  <Link href="" data-toggle="dropdown">
                    {t("orderNow")}
                  </Link>
                  <ul className="dropdown-menu-toggle">
                    <li className="dropdown secondLevel">
                      <input type="checkbox" />
                      <Link href="" data-toggle="dropdown">
                        {t("basedOnSource")}
                      </Link>
                      <ul className="dropdown-menu-toggle">
                        <li>
                          <Link href="/DirectRequest">{t("directRequest")}</Link>
                        </li>
                        <li>
                          <Link href="/Map">{t("countriesReview")} </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown secondLevel">
                      <input type="checkbox" />
                      <Link href="" data-toggle="dropdown">
                        {t("basedOnColor")}
                      </Link>
                      <ul className="dropdown-menu-toggle">
                        <ColorRes />
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <input type="checkbox" />
                  <Link href="" data-toggle="dropdown">
                    {t("products")}
                  </Link>
                  <ul className="dropdown-menu-toggle">
                    <li>
                      <Link className="nav-link" href="/Products">
                        {t("allProducts")}
                      </Link>
                    </li>
                    <Type />
                  </ul>
                </li>

                <li className="Plain-dropdown">
                  <Link href="/Map">{t("sources")}</Link>
                </li>
                <li className="Plain-dropdown">
                  <Link href="/Projects">{t("projects")}</Link>
                </li>

                <li className="dropdown">
                  <input type="checkbox" />
                  <Link href="" data-toggle="dropdown">
                    {t("mediaCenter")}
                  </Link>
                  <ul className="dropdown-menu-toggle">
                    <li>
                      <Link className="nav-link" href="/News">
                        {t("news")}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" href="/Photo-Gallery">
                        {t("gallery")}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" href="/Blog">
                        {t("blogs")}
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <input type="checkbox" />
                  <a data-toggle="dropdown">{t("contact")}</a>
                  <ul className="dropdown-menu-toggle">
                    <li>
                      <Link className="nav-link" href="/Contact">
                        {t("contact")}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" href="/Consulting">
                        {t("date")}
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" href="/Careers">
                        {t("careers")}
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="responsiveLangSearch">
                  <div className="TopLang">
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
                  <div className="TopSearch">
                    <SearchBox />
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <div className="Menu-devider"></div>

          <div className="Menu-Language">
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

          <div className="searchBox-cn">
            <SearchBox />
          </div>

          <div className="social-cn">
            <Social />
          </div>

          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
}

export default Navbar;
