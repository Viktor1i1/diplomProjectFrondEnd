import { useGetUserQuery } from "../../../store/services/userApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../Booking.css";

function BookingCustomer({setStep}){
    const user = useSelector((state) => state.auth.user);
    console.log("USER:", user);

    const [firstName, setFirstName] = useState(user?.firstName || ""); 
    const [lastName, setLastName] = useState(user?.lastName || ""); 
    const [email, setEmail] = useState(user?.email || "");


    return(
        <div className="booking-customer">
            <h2>Дані покупця</h2>
            <p className="customer-description">
                Перевірте та заповніть свої дані
            </p>
            <div className="customer-form">
                <div className="customer-field">
                    <label>Ім'я</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Введіть ім'я"
                    />
                </div>
                <div className="customer-field">
                    <label>Прізвище</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Введіть прізвище"
                    />
                </div>
                <div className="customer-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введіть email"
                    />
                </div>
            </div>
            <div className="customer-actions">
                <button
                    className="customer-back-button"
                    onClick={() => setStep(1)}>
                    Назад
                </button>
                <button
                    className="customer-next-button"
                    onClick={() => setStep(3)}>
                    Продовжити
                </button>
            </div>
        </div>
    )
}
export default BookingCustomer;