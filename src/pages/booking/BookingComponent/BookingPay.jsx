import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../store/reducers/booking/bookingAction";
import { toast } from "react-toastify";
import "../Booking.css";

function BookingPay({event,booking,setStep,setBookingResult}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePay = async (e) => {
        e.preventDefault();
        if (!cardNumber || !cardDate || !cvv) {
            toast.error("Заповніть дані картки")
            return;
        }
        if (!user?.id) {
            toast.error("Користувач не авторизований")
            return;
        }
        if (!event?.id) {
            toast.error("Не знайдено ID події")
            return;
        }
        setIsLoading(true);
        const newBooking = {
            quantity: Number(booking.quantity),
            date: event.date,
            userId: Number(user.id),
            eventId: Number(event.id)
        };

        console.log("Відправ брон:", newBooking);
        const result = await dispatch(addBooking(newBooking));
        setIsLoading(false);
        if (result) {
            setBookingResult({
                eventName: event.name,
                eventDate: event.date,
                city: event.city,
                quantity: booking.quantity,
                totalPrice: booking.totalPrice
            });
            setStep(4);
        } else {
            toast.error("Не вдалося створити бронювання")
        }
    };

    return (
        <div className="booking-pay-page">
            <div className="booking-pay-container">
                <h1>Оплата</h1>
                <div className="booking-pay-content">
                    <div className="booking-order">
                        <h2>Ваше замовлення</h2>
                        <div className="booking-info">
                            <div>
                                <span>Подія</span>
                                <strong>{event.name}</strong>
                            </div>
                            <div>
                                <span>Дата</span>
                                <strong>{new Date(event.date).toLocaleDateString("uk-UA")}</strong>
                            </div>
                            <div>
                                <span>Місто</span>
                                <strong>{event.city}</strong>
                            </div>
                            <div>
                                <span>Кількість квитків</span>
                                <strong>{booking.quantity}</strong>
                            </div>
                        </div>
                        <div className="booking-total">
                            <span>До оплати</span>
                            <strong>{booking.totalPrice} грн</strong>
                        </div>
                    </div>
                    <form className="payment-form" onSubmit={handlePay}>
                        <h2>Дані картки</h2>
                        <label>Номер картки</label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            autoComplete="cc-number"/>
                        <div className="payment-row">
                            <div>
                                <label>Термін дії</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={cardDate}
                                    onChange={(e) => setCardDate(e.target.value)}
                                    autoComplete="cc-exp"/>
                            </div>
                            <div>
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="000"
                                    value={cvv}
                                    onChange={(e) =>setCvv(e.target.value)}
                                    autoComplete="cc-csc"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="payment-button">
                            {isLoading ? "Обробка..." : "Оплатити"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default BookingPay;