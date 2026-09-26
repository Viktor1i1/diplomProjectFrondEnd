import { useState,useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Baner from "../../components/baner/Baner";
import ArtistHome from "../../components/ArtistHome/ArtistHome";
import BtnEventSort from "../../components/btnEventsSort/BtnEventsSort";
import BtnCategoriesSort from "../../components/btnCategoriesSort/btnCategoriesSort";
import EventHome from "../../components/EventHome/EventHome";

function Home({city}) {
    const [selectMonth, setSelectMonth] = useState(null);
    const [selectCategory,setSelectCategory] = useState("Усі типи")
    useEffect(() => {
        setSelectMonth(null);
        setSelectCategory("Усі типи");
    }, [city]);
    return(
        <div>
            <Helmet>
                <title>Головна</title>
            </Helmet>
            <div>
                <Baner city={city}/>
            </div>
            <div>  
                <ArtistHome/>
            </div>
            <div>
                <BtnEventSort selectMonth={selectMonth} setSelectMonth={setSelectMonth}/>
            </div>
            <div style={{marginTop: "20px",marginBottom:"20px"}}>
                <BtnCategoriesSort selectCategory={selectCategory} setSelectCategory={setSelectCategory}/>
            </div>
            <div>
                <EventHome city={city} selectMonth={selectMonth} selectCategory={selectCategory}/>
            </div>
        </div>
    )
}

export default Home;