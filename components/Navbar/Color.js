import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
 
import i18next from 'i18next';

export default function Color() {
 
  const [ColorInfo, setColorInfo] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/colors`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setColorInfo(res.data);
    });
  }, []);
 
  return (
    <>
      {ColorInfo.map((data, i) => {
        return (
          <li key={i}>
            <Link className="nav-link" href={`/Products?UrlColorID=${data.id}`}>
               { i18next.language === "ar" ? data.color : data.colorEn }
            </Link>
          </li>
        );
      })}
    </>
  );
}
