import { Link } from "react-router";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DomainIcon from '@mui/icons-material/Domain';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

function EventCard({event}){
    return(
        <Link to={`events/${event.id}`} style={{ textDecoration: "none" }}>
            <div
                className="eventCard"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
                    backgroundColor: "#fff",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1"}}>
                    <img
                        src={event.image}
                        alt={event.name}
                        style={{ width: "100%", height: "310px", objectFit: "cover", display: "block" }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        padding: "14px 16px 18px",
                    }}
                >
                    <div
                        style={{
                            fontWeight: "700",
                            fontSize: "1.15em",
                            color: "#1a1a1a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {event.name}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.95em",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <CalendarMonthIcon fontSize="small" style={{ color: "#888" }} />
                        {event.date}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.95em",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <AccessTimeIcon fontSize="small" style={{ color: "#888" }} />
                        {event.time}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.95em",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <FmdGoodIcon fontSize="small" style={{ color: "#888" }} />
                        {event.address}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.95em",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <DomainIcon fontSize="small" style={{ color: "#888" }} />
                        {event.city}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#444",
                            fontSize: "0.95em",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <ConfirmationNumberIcon fontSize="small" style={{ color: "#888" }} />
                        {event.price} грн
                    </div>
                    <button
                        style={{
                            marginTop: "6px",
                            backgroundColor: "#14b8b0",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "12px",
                            fontWeight: "700",
                            fontSize: "1em",
                            cursor: "pointer",
                        }}
                    >
                        Купити квиток
                    </button>
                </div>
            </div>
        </Link>
    )
}
export default EventCard;