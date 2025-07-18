import { useState , useEffect } from "react";
import axios from "axios";
import i18n from "@/i18n";
export default function ContactInfo() {
    const [ContactInfo , setContactInfo] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/contacts`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setContactInfo(res.data);
        })
        
    }, [])
    return(
        <div>
      

            {ContactInfo.map((data , i) => {
                return(
                    <div  className="ContactInfo"  key={i}>
                               <div>{data.address}</div> 
                                - 
                               <div>{data.email}</div> 
                                - 
                               <div className={i18n.language === "ar" ? "dir-ltr" : ""}> {(data.tel).replace(RegExp("/n","g"), "<br>")}</div> 
                    </div>
                 )
            })}
            
        </div>
    )
}