import { useState , useEffect } from "react";
import axios from "axios";
export default function FilterCountry() {

 
    
  
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
        <div className="filters-checkboxes-btns">                 
            <ul>
            {CountryInfo.map((data , i) => {
                return(
                    <li  key={i}>
                        <input type="checkbox" id={`FilterCountry` + data.id} name="Source[]" value={data.id} />
                        <label htmlFor={`FilterCountry` + data.id}>{data.country}</label>
                    </li>
                    )
                })}
               
 
            </ul>
        </div>
    )
}