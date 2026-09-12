import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
import banerImages from "./dataBaners"
import { api } from "../../api";
import "./Baner.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Baner({city}){
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadAllEvents = async () => {
            try {
                const firstResponse = await api.get("events?page=1");
                const firstData = firstResponse.data.payload;
                let allEvents = [...firstData.items];
                const totalPages = firstData.total_pages;
                for (let page = 2; page <= totalPages; page++) {
                    const response = await api.get(
                        `events?page=${page}`
                    );
                    allEvents = [...allEvents,...response.data.payload.items];
                }
                setEvents(allEvents);
            } catch (error) {
                console.log(error);
            }

        };
        loadAllEvents();
        setCurrentIndex(0);
    }, [city]);
    const cityBannerIds = {
        "Одеса": [94, 100, 101, 106,113,119,135],
        "Львів": [27, 42, 91, 92, 93, 95, 105, 128, 147],
        "Київ": [12, 23, 96, 97, 98, 99,138],
        "Вінниця": [120, 102, 121, 122, 133, 145],
        "Чернівці" : [103,137,140,141,142],
        "Івано-Франківськ" : [104,126,143,146],
        "Черкаси" : [107,112,136,155],
        "Дніпро" : [15,109,114,131,156],
        "Полтава" : [110,115,124 ],
        "Харків" : [111,123,139],
        "Миколаїв" : [116, 134, 154],
        "Запоріжжя" : [117,132],
        "Кривий Ріг" : [118,157,158],
        "Тернопіль" : [125, 148,30,160],
        "Ужгород" : [32,127,161],
        "Луцьк" : [129, 144, 151],
        "Рівне" : [130 , 150,162],
        "Хмельницький" : [16, 152, 163],
        "Житомир" : [149],
        "Кропивницький" : [153,159, 164],
    };
    const bannerIds = cityBannerIds[city] || [];

    const cityEvents = events.filter(
        event =>
            event.city === city &&
            bannerIds.includes(event.id) &&
            banerImages[event.id]

    );
    if (cityEvents.length === 0) {
        return null;
    }

    const event = cityEvents[currentIndex];

    const bannerImage = banerImages[event.id];

    function nextBan(e) {
        e.stopPropagation();
        setCurrentIndex(prevIndex => {
            if (prevIndex === cityEvents.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    }
    function prevBan(e) {
        e.stopPropagation();
        setCurrentIndex(prevIndex => {
            if (prevIndex == 0) {
                return cityEvents.length - 1;
            }
            return prevIndex - 1;
        });
    }

    return(
        <div className="banner-wrapper">
            <div className="bannerArrow arrowLeft" onClick={prevBan}>
                <ArrowBackIosIcon />
            </div>
            <div
                className="banner"
                onClick={() => navigate(`/events/${event.id}`)}>
                <img src={bannerImage} alt={event.name} />
            </div>
            <div className="bannerArrow arrowRight" onClick={nextBan}>
                <ArrowForwardIosIcon />
            </div>
        </div>
    )
}
export default Baner;
