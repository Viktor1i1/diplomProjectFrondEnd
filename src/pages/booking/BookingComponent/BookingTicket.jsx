import { colors } from "@mui/material";
import { useState } from "react";
import "../Booking.css";

function BookingTicket({event,setStep,setBooking}){
    const [ticketType,setTicketType] = useState("standard");
    const [quantityTicket,setQuantityTicket] = useState(1)
    const standartPrice = event.price;
    const vipPrice = event.price * 2;
    let ticketPrice = standartPrice;
    if(ticketType == "standard"){
        ticketPrice = standartPrice;
    }
    else{
        ticketPrice = vipPrice;
    }

    let totalPrice = ticketPrice * quantityTicket;


    return(
        <div className="booking-ticket">
            <h2>Оберіть кількість квитків</h2>
            <div className="ticket-types">
                <div className={ ticketType == "standard" ? "ticket-type selected" : "ticket-type"}
                    onClick={() => setTicketType("standard")}
                >
                    <div className="ticket-radio">
                        <span></span>
                    </div>
                    <div className="ticket-type-info">
                        <div>
                            <h3>Стандарт</h3>
                            <p>{standartPrice} грн</p>
                        </div>
                        <p className="p">Основний сектор,хороший огляд</p>
                    </div>
                </div>
                <div
                    className={ticketType == "vip" ? "ticket-type selected" : "ticket-type"}
                        onClick={() => setTicketType("vip")}
                    >
                    <div className="ticket-radio">
                        <span></span>
                    </div>
                    <div className="ticket-type-info">
                        <div>
                            <h3>VIP</h3>
                            <p>{vipPrice} грн</p>
                        </div>
                        <p className="p">Преміум-сектор,найкращий огляд сцени</p>
                    </div>
                </div>
            </div>
            <h2 className="quantity-title">
                Кількість квитків
            </h2>
            <div className="ticket-quantity">
                <button onClick={() => {
                    if(quantityTicket > 1) setQuantityTicket(quantityTicket - 1)}
                    }>
                    −
                </button>
                <span>{quantityTicket}</span>
                <button onClick={() => setQuantityTicket(quantityTicket + 1)}>
                    +
                </button>
            </div>
            <div className="ticket-price">
                <div>
                    <span>Ціна за квиток</span>
                    <strong>{ticketPrice} грн</strong>
                </div>
                <div className="ticket-total">
                    <span>Разом</span>
                    <strong>{totalPrice} грн</strong>
                </div>
            </div>
            <div className="ticket-actions">
                <button
                    className="ticket-next-button"
                    onClick={() => {
                    setBooking({
                        quantity: quantityTicket,
                        totalPrice: totalPrice
                    });
                    setStep(2);
                }}>
                    Продовжити
                </button>
            </div>
        </div>
    )
}
export default BookingTicket;