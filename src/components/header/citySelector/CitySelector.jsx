import { useState } from "react";
import "./CitySelector.css";

function CitySelector({city,setCity}){
    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState("Україна");
    const [selectedCity, setSelectedCity] = useState(city);

    const cities = [
        "Львів","Вінниця", "Дніпро",
        "Житомир", "Запоріжжя",
        "Івано-Франківськ", "Київ", "Кропивницький", 
        "Кривий Ріг", "Луцьк", 
        "Миколаїв", "Одеса",
        "Полтава", "Рівне", "Тернопіль","Ужгород", 
        "Харків", "Хмельницький", 
        "Черкаси","Чернівці"
        ]
    const handleApply = () => {
        setCity(selectedCity);
        setIsOpen(false);
    };
    return(
        <div className="blockCitySelector">
            <button
                className="city-selector-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="spanCity">{city}</span>
                <span className="city-arrow">↓</span>
            </button>
            {isOpen && (
                <div className="citySelector">
                    <label className="city-label">Країна</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="Україна">Україна</option>
                    </select>

                    <label className="city-label">Місто</label>
                    <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        {cities.map((cityName) => (
                            <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                        </select>

                    <button className="applyCityButton" onClick={handleApply}>ЗАСТОСУВАТИ</button>
                </div>
            )}
        </div>
    )
}
export default CitySelector;