import { useState, useEffect } from "react";
import Navbar from "../../Navbar/nav";
import Footer from "../../Footer/index";
import axios from "axios";
import Link from "next/link";
export default function Journey() {
  const [JourneyDetails, setJourneyDetails] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/journey`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setJourneyDetails(res.data);
    });
  }, []);

  return (
    <div className="webPageCn">
      <Navbar InPage="About" />

      <div className="PageInner">
        <div className="HomeMediaTitle AboutPad">من نحن</div>
        <div className="AboutMenu">
          <ul>
            <li>
              <Link href="/About">المقدمة</Link>
            </li>
            <li>
              <Link state={{ from: "CEO" }} href="/About">
                كلمة المدير
              </Link>
            </li>
            <li>
              <Link state={{ from: "VisionMission" }} href="/About">
                الرؤية
              </Link>
            </li>
            <li>
              <Link state={{ from: "VisionMission" }} href="/About">
                الرسالة
              </Link>
            </li>
            <li>
              <Link state={{ from: "philosophy" }} href="/About">
                فلسفتنا
              </Link>
            </li>
            <li>
              <Link href="/Journey">رحلتنا</Link>
            </li>
            <li>
              <Link href="/Manufacture">المصنع</Link>
            </li>
            <li>
              <Link state={{ from: "branches" }} href="/Manufacture">
                الفروع
              </Link>
            </li>
            <li>
              <Link state={{ from: "warehouse" }} href="/Manufacture">
                المستودعات
              </Link>
            </li>
          </ul>
        </div>
        <div className="AboutIntroTitle PageInTitle">رحلتنا</div>
        <div className="alt-vtl">
          {JourneyDetails.map((data, i) => {
            return (
              <div className="alt-event" key={data.id}>
                <div className="date">{data.year}</div>
                <div className="txt">{data.text}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
