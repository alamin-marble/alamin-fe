import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
export default function Job() {
  const [t] = useTranslation();
 
  const [Jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/availableJobs/lang?lang=${i18n.language}`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setJobs(res.data);
    });
  }, []);

  return (
    <div className="JobCN">
      <>
        {Jobs?.data?.map((data, i) => {
          return (
            <div className="JobInner" key={i}>
              <div className="HomeMediaInnerTitle">{data.title}</div>
              <div className="HomeMediaDesc">{data.text}</div>
              <div className="JobLink">
                <Link href={`/CareersForm/${data.id}`}>{t("applyJob")}</Link>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}
