import { useState , useEffect } from "react";
import axios from "axios";
export default function FilterType() {

    const [FilterTypeInfo , setFilterTypeInfo] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/productTypes`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setFilterTypeInfo(res.data);
        })
        
    }, [])

 

    return(
        <div className="filters-checkboxes-btns">                 
            <ul>
            {FilterTypeInfo.map((data , i) => {
                return(
                    <li  key={i}>
                        <input type="checkbox" id={`FilterType` + data.id} name="Source[]" />
                        <label htmlFor={`FilterType` + data.id}>{data.title}</label>
                    </li>
                    )
                })}
               
 
            </ul>
        </div>
    )
}