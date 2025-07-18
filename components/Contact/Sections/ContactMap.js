import { useState , useEffect } from "react";
import axios from "axios";
export default function ContactMap() {
    const [ContactMap , setContactMap] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/contacts`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setContactMap(res.data);
        })
        
    }, [])

    return(
        <div className="ContactMap" >
            

            {ContactMap.map((data , i) => {
                return(
             
                        <iframe  key={i} src={data.mapLink} height="500" width="100%" title="Map"/> 
              
                 )
            })}
            
        </div>
    )
}