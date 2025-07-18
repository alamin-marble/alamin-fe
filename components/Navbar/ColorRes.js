import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import i18next from 'i18next';

export default function ColorRes() {
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
            <Link href={`/Products?UrlColorID=${data.id}`}>
            { i18next.language === "ar" ? data.color : data.colorEn }
            </Link>
          </li>
        );
      })}
    </>
  );
}
