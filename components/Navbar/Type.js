import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import i18next from 'i18next';
export default function Type() {
  const [TypeInfo, setTypeInfo] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/productTypes`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setTypeInfo(res.data);
    });
  }, []);

  return (
    <>
      {TypeInfo.map((data, i) => {
        return (
          <li key={i}>
            <Link className="nav-link" href={`/Products?UrlTypeID=${data.id}`}>
        
              { i18next.language === "ar" ? data.title : data.titleEn }
            </Link>
          </li>
        );
      })}
    </>
  );
}
