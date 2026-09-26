import { useNavigate } from "react-router";
import "../Booking.css";

function BookingSuccess({ booking }) {
    const navigate = useNavigate();
    if (!booking) {
        return (
            <div className="booking-success-page">
                <div className="booking-success-container">
                    <h2>Бронювання не знайдено</h2>
                    <button onClick={() => navigate("/")}>На головну</button>
                </div>
            </div>
        );
    }
    return (
        <div className="booking-success-page">
            <div className="booking-success-container">
                <div className="success-icon">✓</div>
                <h1>Бронювання успішно оформлено!</h1>
                <p className="success-text">Дякуємо за покупку. Ваше бронювання було успішно створено.</p>
                <div className="success-booking">
                    <h2>Деталі бронювання</h2>
                    <div className="success-info">
                        <div>
                            <span>Подія</span>
                            <strong>{booking.eventName}</strong>
                        </div>
                        <div>
                            <span>Дата</span>
                            <strong>
                                {new Date(
                                    booking.eventDate
                                ).toLocaleDateString("uk-UA")}
                            </strong>
                        </div>
                        <div>
                            <span>Місто</span>
                            <strong>{booking.city}</strong>
                        </div>
                        <div>
                            <span>Кількість квитків</span>
                            <strong>{booking.quantity}</strong>
                        </div>
                        <div>
                            <span>Сума</span>
                            <strong>{booking.totalPrice} грн</strong>
                        </div>
                    </div>
                </div>
                <div className="success-buttons">
                    <button
                        onClick={() => navigate("/")}
                        className="home-button">На головну
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingSuccess;