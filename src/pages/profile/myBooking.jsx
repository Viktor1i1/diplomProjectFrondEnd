import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useGetMyBookingsQuery } from "../../store/services/bookingApi";
import { useGetEventsQuery } from "../../store/services/eventApi";
import { useGetEventsForHomeQuery } from "../../store/services/eventApi";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import "./Profile.css";

function MyBookings() {
    const user = useSelector((state) => state.auth.user);
    const { data, isLoading, isError } =useGetMyBookingsQuery(user?.id);
    const { data: eventsData } =useGetEventsForHomeQuery();

    if (isLoading) {
        return (
            <div className="my-bookings">
                <h1>Мої бронювання</h1>
                <p className="bookings-message">Завантаження...</p>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="my-bookings">
                <h1>Мої бронювання</h1>
                <p className="bookings-message error">
                    Не вдалося завантажити бронювання.
                </p>
            </div>
        );
    }
    const bookings = data?.payload || [];
    const events = eventsData?.payload?.items || eventsData?.payload || [];

    if (bookings.length === 0) {
        return (
            <div className="my-bookings">
                <h1>Мої бронювання</h1>
                <div className="empty-bookings">
                    <div className="empty-icon">
                        <LocationPinIcon />
                    </div>
                    <h2>У вас ще немає бронювань</h2>
                    <p>
                        Знайдіть цікаву подію та забронюйте квитки.
                    </p>
                    <Link to="/" className="events-button">Перейти до подій</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="my-bookings">
            <h1>Мої бронювання</h1>
            <div className="bookings-list">
                {bookings.map((booking) => {
                    const event = events.find((event) => Number(event.id) === Number(booking.eventId));
                        const totalPrice = Number(event?.price || 0) * Number(booking.quantity || 0);
                    return (
                        <div className="booking-card" key={booking.id}>
                            <div className="booking-image">
                                {event?.image ? (
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                    />
                                ) : (
                                    <div className="no-image">
                                        <LocationPinIcon />
                                    </div>
                                )}
                            </div>
                            <div className="booking-info">
                                <h2>{event?.name || "Подія"}</h2>
                                <div className="booking-details">
                                    <p>
                                        <span><CalendarMonthIcon/></span>
                                        {event?.date || booking.date || "Дата не вказана"}
                                    </p>
                                    <p>
                                        <span><AccessTimeIcon/></span>
                                        {event?.time || "Час не вказаний"}
                                    </p>
                                    <p>
                                        <span><LocationPinIcon/></span>
                                        {event?.city || ""}
                                        {event?.address ? `, ${event.address}` : ""}
                                    </p>
                                </div>
                                <div className="booking-bottom">
                                    <div style={{display:"flex"}}>
                                        <span className="booking-label">Квитки</span>
                                        <strong>{booking.quantity}</strong>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <span className="booking-label">Сума</span>
                                        <strong>{totalPrice} грн</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-status">
                                <span>Заброньовано</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyBookings;