import { Link } from "react-router";
import { useGetMyBookingsQuery} from "../../store/services/bookingApi";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import "./Profile.css";

function MyBookings({user}) {
    const { data, isLoading, isError } = useGetMyBookingsQuery();
    
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

    const bookings = data?.payload?.items || data?.payload || data || [];
    if (bookings.length === 0) {
        return (
            <div className="my-bookings">
                <h1>Мої бронювання</h1>
                <div className="empty-bookings">
                    <div className="empty-icon"><LocationPinIcon/></div>
                    <h2>У вас ще немає бронювань</h2>
                    <p>Знайдіть цікаву подію та забронюйте квитки.</p>
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
                    const event = booking.event;
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
                                        <LocationPinIcon/>
                                    </div>
                                )}
                            </div>
                            <div className="booking-info">
                                <h2>{event?.name || "Подія"}</h2>
                                <div className="booking-details">
                                    <p><span>📅</span>{event?.date || "Дата не вказана"}</p>
                                    <p><span>🕐</span>{event?.time || "Час не вказаний"}</p>
                                    <p><span>📍</span>{event?.city || ""}{event?.address ? `, ${event.address}` : ""}</p>
                                </div>
                                <div className="booking-bottom">
                                    <div>
                                        <span className="booking-label">Кількість квитків</span>
                                        <strong>{booking.quantity}</strong>
                                    </div>
                                    <div>
                                        <span className="booking-label">Сума</span>
                                        <strong>{booking.totalPrice} грн</strong>
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