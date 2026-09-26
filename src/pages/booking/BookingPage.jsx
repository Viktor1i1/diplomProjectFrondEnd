import { useState } from "react";
import { useParams } from "react-router";
import { useGetEventQuery, useGetEventsQuery } from "../../store/services/eventApi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; 
import AccessTimeIcon from "@mui/icons-material/AccessTime"; 
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Helmet } from "react-helmet-async";
import "./Booking.css";

import BookingTicket from "./BookingComponent/BookingTicket";
import BookingCustomer from "./BookingComponent/BookingCustomer";
import BookingPay from "./BookingComponent/BookingPay";
import BookingSuccess from "./BookingComponent/BookingSuccess";

function BookingPage() {
    const { id } = useParams();

    const { data, isLoading, isError } = useGetEventQuery(id);
    const [step, setStep] = useState(1);

    const [booking, setBooking] = useState({
        quantity: 1,
        totalPrice: 0
    });

    const [bookingResult, setBookingResult] = useState(null);

    
    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (isError || !data) {
        return <div>Не вдалося завантажити подію</div>;
    }

    const event = data.payload;
    const eventDate = new Date(event.date);

    const day = eventDate.getDate();

    const months = ["Січня","Лютого","Березня",
        "Квітня","Травня","Червня",
        "Липня","Серпня","Вересня",
        "Жовтня","Листопада","Грудня"];

    const month = months[eventDate.getMonth()];
    const year = eventDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    return (
        <div className="booking-page">
            <Helmet>
                <title>Бронювання</title>
            </Helmet>
            <div className="booking-container">
                <p></p>
                <div className="booking-event-info"> 
                    <div className="booking-event-image"> 
                        <img src={event.image} alt={event.name} /> 
                    </div> 
                    <div className="booking-event-data">
                        <h2>{event.name}</h2> 
                        <div className="booking-event-detail"> 
                            <AccessTimeIcon /> 
                            <span>{event.time}</span> 
                        </div>
                        <div className="booking-event-detail"> 
                            <CalendarMonthIcon /> 
                            <span>{formattedDate}</span> 
                        </div>  
                        <div className="booking-event-detail"> 
                            <FmdGoodIcon /> 
                            <span> {event.city} </span> 
                        </div> 
                        <div className="booking-event-detail"> 
                            <FmdGoodIcon /> 
                            <span> {event.address} </span> 
                        </div> 
                    </div> 
                </div>
                <div className="booking-steps">
                    <div className={step >= 1 ? "step active" : "step"}>
                        <span>1</span>
                        <p>Квитки</p>
                    </div>
                    <div className={step >= 2 ? "step active" : "step"}>
                        <span>2</span>
                        <p>Дані покупця</p>
                    </div>
                    <div className={step >= 3 ? "step active" : "step"}>
                        <span>3</span>
                        <p>Оплата</p>
                    </div>
                    <div className={step >= 4 ? "step active" : "step"}>
                        <span>4</span>
                        <p>Готово</p>
                    </div>
                </div>
                <div className="booking-content">
                    {step === 1 && (
                        <BookingTicket
                            event={event}
                            setStep={setStep}
                            setBooking={setBooking}
                        />
                    )}

                    {step === 2 && (
                        <BookingCustomer setStep={setStep} />
                    )}

                    {step === 3 && (
                        <BookingPay
                            event={event}
                            booking={booking}
                            setStep={setStep}
                            setBookingResult={setBookingResult}
                        />
                    )}

                    {step === 4 && (
                        <BookingSuccess booking={bookingResult} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
//booking={booking} setBooking={setBooking}