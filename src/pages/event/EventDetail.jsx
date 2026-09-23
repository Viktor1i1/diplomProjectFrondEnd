import {useNavigate, useParams } from "react-router";
// import NotFound from "../notFound/NotFound";
import { useGetEventQuery ,useGetEventsForHomeQuery} from "../../store/services/eventApi";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spiner from "../../components/spiner/Spiner";
import { Link } from "react-router";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import "./EventDetail.css"

function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const {data,isLoading,isError,isSuccess} = useGetEventQuery(id);
    const {data: eventsData} = useGetEventsForHomeQuery({page: 1,page_size: 1000});

    function switchFavorite() {
        const value = !isFavorite;
        setIsFavorite(value);
        const localFavorite = localStorage.getItem("favorite");
        let items = [];
        if (localFavorite) {
            items = JSON.parse(localFavorite);
        }
        if (value) {
            if (!items.includes(id)) {
                items.push(id);
            }
        } else {
            items = items.filter((item) => item != id);
        }
        localStorage.setItem("favorite", JSON.stringify(items));
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        const localData = localStorage.getItem("favorite");
        if (localData) {
            const items = JSON.parse(localData);
            if (items.some((item) => item == id)) {
                setIsFavorite(true);
            }
        }
    }, [id]);

    if (isLoading) {
        return <Spiner />;
    }

    if (isError) {
        navigate("/", { replace: true });
        return null;
    }

    if (!isSuccess || !data?.payload) {
        return null;
    }

    const event = data.payload;

    const events = eventsData?.payload?.items || [];

    const eventFromList = events.find(
        (item) => item.id == id
    );

    const artist = eventFromList?.artist;

    const eventDate = new Date(event.date);

    const day = eventDate.getDate();

    const months = ["СІЧНЯ","ЛЮТОГО","БЕРЕЗНЯ","КВІТНЯ","ТРАВНЯ","ЧЕРВНЯ",
        "ЛИПНЯ","СЕРПНЯ","ВЕРЕСНЯ","ЖОВТНЯ","ЛИСТОПАДА","ГРУДНЯ"];

    const month = months[eventDate.getMonth()];
    const year = eventDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    return (
        <div className="wrap">
            <Helmet>
                <title>{event.name}</title>
            </Helmet>
            <div className="event-breadcrumb">
                <Link to="/">Афіша {event.city}</Link>
                    <span> » </span>
                    <span>{event.name}</span>
            </div>
            <div className="top-grid">
                <div className="poster">
                    <div className="tags">
                        <img src={event.image} alt={event.name}/>
                    </div>
                </div>
                <div className="card title-card">
                    <div className="box">
                        <div className="date-line">{formattedDate}</div>
                        <div className="event-title">{event.name}</div>
                    </div>
                    <div className="card price-card">
                        <div className="price-label">Ціна:</div>
                        <div className="price-val">{event.price} грн</div>
                    </div>
                </div>
                <div className="card venue-card">
                    <div className="venue-left">
                        <span className="pin">📍</span>
                        <div>
                            <div className="name">{event.city}</div>
                            <div className="addr">{event.address}</div>
                        </div>
                    </div>
                    <button className="buy-btn">КУПИТИ КВИТОК</button>
                </div>
                <div className="share">Поділитися в соцмережах:
                    <span className="icons">
                        <span style={{backgroundColor:"#333",color:"#fff"}}><FacebookIcon/></span>
                        <span><PinterestIcon/></span>
                        <span><TwitterIcon/></span>
                    </span>
                </div>
            </div>
            <div className="content-grid">
                <div className="main-col">
                    <div className="card order-card">
                        <h3>Замовити квитки на «{event.name}»</h3>
                        <div className="order-date">📅 {day} {months[eventDate.getMonth()].toLowerCase()}</div>
                        <div className="order-row">
                            <div className="meta">
                                <span>🕒 <b>{event.time}</b></span>
                                <span>🎫 {event.price} грн</span>
                            </div>
                            <button className="buy-btn">Купити квиток</button>
                        </div>
                    </div>
                    <div className="card about-card">
                        <h3>Про подію</h3>
                        <h4>{event.name}</h4>
                        <p>{event.description}</p>
                        <p><b>Місто:</b> {event.city}</p>
                        <p><b>Місце:</b> {event.address}</p>
                        <p><b>Жанр:</b> {event.genre}</p>
                        <p><b>Тривалість:</b> {event.duration} хв.</p>
                    </div>
                </div>
                <div className="side-col">
                    <div className="side-card">
                        <img
                            src={event.image}
                            alt={event.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </div>
            </div>
            {artist && (
                <div className="artist">
                    <h2>Артист</h2>
                    <div className="artistName" onClick={() => navigate(`/artists/${artist.id}`)}>
                        {artist.name}
                    </div>
                </div>
            )}
            <button
                onClick={switchFavorite}
                className="favorite-button"
            >
                {isFavorite ? ("❤️ В обраних") : ("♡ Додати в обрані")}
            </button>
        </div>
    );
}
export default EventDetail;

