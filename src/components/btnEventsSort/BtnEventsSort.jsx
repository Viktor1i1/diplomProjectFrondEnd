import { useState } from "react";
import "./btnEventsSort.css"

function BtnEventSort(){
    const [selectMonth,setSelectMonth] = useState(null);

    const months = ["Серпень","Вересень","Жовтень","Листопад","Грудень","Січень","Лютий"]

    return(
        <div className="filterMonths">
            <div className="eventsMonths">
                {months.map((month)=>(
                    <button key={month} className="eventsMonth">{month}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default BtnEventSort;