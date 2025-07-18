import { useState , useEffect } from "react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import axios from "axios";
 export default function Journey() {
    const [t] = useTranslation();
    const [JourneyDetails , setJourneyDetails] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.SERVER_LINK}/api/journey/lang?lang=${i18n.language}&limit=10&offset=0`)
        .then(res => {
          //const emps = res.data;
          //this.setState({ emps });
          setJourneyDetails(res.data);
        })
        
    }, [])

 
    return(
       
 

        <div className="AboutCenterSection">
                    <div className="AboutIntroTitle ">{t("journey")}</div>
                    <div className="alt-vtl">
                        
                        {JourneyDetails?.data?.map((data , i) => {
                            return (
                            <div className="alt-event"  key={data.id}>
                                <div className="date">{data.year}</div>
                                <div className="txt">{data.text}</div>
                            </div>
                            )
                        })}

                    </div>
        </div>
    )
}