import { Link } from "react-router";
import { useGetCategoriesQuery } from "../../store/services/categoryApi";
import "./Footer.css"
import logoFooter from "./images/logo-k-ka.svg";
import tourPhoto from "./images/LRV_TOUR_WHITE.svg";
import bannerAndroid from "./images/banner-android-link.png";
import bannerIos from "./images/banner-ios-link.png";
import visa from "./images/visa.png";
import mc from "./images/mc.png";
import pb from "./images/pb.svg";

function Footer(){
    const {data, isLoading, isError} = useGetCategoriesQuery();
    const categories = data?.payload?.items || [];


    return(
        <div className="footerContainer">
            <div className="footerCategories">
                {isLoading && (<span>Завантаження...</span>)}
                    {!isLoading && !isError &&
                        categories.map((category) => (
                            <Link key={category.id} to='/${category.name}' className="footerCategory-link">{category.name}</Link>
                        ))
                    }
             </div>
            <div className="footerBox">
                <div className="box1">
                    <img src={logoFooter} alt="" />
                    <p>©2026 «Kontramarka.ua» Всі права захищені</p>
                    <p>Публічний договір (оферта)</p>
                    <img src={tourPhoto} alt="" />
                </div>
                <div className="box2">
                    <div className="app">
                        <img src={bannerAndroid} alt="" />
                        <img src={bannerIos} alt="" />
                    </div>
                    <p>mail@kontramarka.ua</p>
                </div>
                <div className="box3">
                    <p>ПРО НАС</p>
                    <p>Каси</p>
                </div>
                <div className="box4">
                    <p>ПАРТНЕРАМ</p>
                    <p>Організаторам</p>
                    <p>Корпоративним клієнтам</p>
                    <p>ОПЛАТА</p>
                    <div className="pay">
                        <img src={visa} alt="" />
                        <img src={mc} alt="" />
                        <img src={pb} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;