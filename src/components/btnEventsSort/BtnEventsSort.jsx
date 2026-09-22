import "./btnEventsSort.css"

function BtnEventSort({selectMonth, setSelectMonth}){

    const months = ["Серпень","Вересень","Жовтень","Листопад","Грудень","Січень","Лютий"]

    return(
        <div className="filterMonths">
            <div className="eventsMonths">
                {months.map((month)=>(
                    <button key={month} className="eventsMonth" onClick={() => setSelectMonth(month)}>{month} 
                    </button>
                ))}
            </div>
        </div>
    )
}
export default BtnEventSort;