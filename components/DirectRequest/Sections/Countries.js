import { useState , useEffect } from "react";
import axios from "axios";
export default function Countries() {

    const [CountryInfo , setCountryInfo] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/productsCountry`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setCountryInfo(res.data);
        })
        
    }, [])
 

    return(
            <>
            {CountryInfo.map((data , i) => {
                return(
                    <option  key={i} value={data.countryEn}>{data.country}</option>
                    )
                })}
            </>
    )
}