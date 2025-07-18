import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
export default function FilterColor() {
  const [ColorInfo, setColorInfo] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.SERVER_LINK}/api/colors`).then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      setColorInfo(res.data);
    });
  }, []);

  return (
    <div className="FilterColorBox">
      {ColorInfo.map((data, i) => {
        return (
          <Link href="/#" key={i}>
            <div
              className="ColorBox"
              data-color={data.colorEn}
              style={{ backgroundColor: `${data.hexCode}` }}
            ></div>
          </Link>
        );
      })}
    </div>
  );
}
