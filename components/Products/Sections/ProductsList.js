import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import Fancybox from "../../../Others/Fancybox";
import Link from "next/link";
import Image from 'next/image';
export default function ProductsList({ CountryFilter }) {
  const [ProductData, setProductData] = useState();

  const FormData = {
    limit: 10,
    offset: 0,
  };

  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === isNaN() ||
        obj[propName].length === 0
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  clean(FormData);

  useEffect(() => {
    console.log(CountryFilter);
    axios
      .post(`${process.env.SERVER_LINK}/api/products/filter`, FormData)
      .then((res) => {
        setProductData(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.log("err", err));
  }, [FormData, CountryFilter]);

  return (
    <Fancybox>
      <Row className="m-0">
        {ProductData?.data.map((data, i) => {
          return (
            <Col lg={4} sm={6} xs={6} className="p-0" key={i}>
              <div className="ProductSliderInfo text-center ProductPageInnerInfo">
                <div className="ProductMask">
                  <div className="ProductShape"></div>
                  <div className="ProductShape2">
                    {/* {data.colors.map((colorInfo , i) => {
                                        return(
                                            <div key={i}>
                                             {colorInfo.imageID.map((ImageInfo , i) => {
                                                return ( 
                                                    <div key={i} data-fancybox="ProductsMostSale" data-caption={ProductNames} href={ImageInfo.imageURL}> <img key={ImageInfo.id} src={ImageInfo.imageURL} alt="rokham" />  </div>
                                                )
                                             })}
                                            </div>
                                        )
                                        
                                    })} */}

                    <div
                      key={i}
                      data-fancybox="ProductsMostSale"
                      data-caption={data.title}
                      href={data?.colors[0]?.imageID[0]?.image?.url}
                    >
                      {" "}
                      <Image
                        loading="eager"
                        width={300}
                        height={300}
                        src={data?.colors[0]?.imageID[0]?.image?.url}
                        alt="rokham"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="ProductColor">{data?.colors[0]?.color} </div>
                <div className="ProductDevider">-</div>
                <div className="ProductCountry">
                  {data.Country_description}{" "}
                </div>
                <div className="ProductType">{data.title}</div>
                <div className="CeoLink">
                  <Link href={`/ProductsDetails/${data.id}`}>
                    المزيد من التفاصيل
                  </Link>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Fancybox>
  );
}
