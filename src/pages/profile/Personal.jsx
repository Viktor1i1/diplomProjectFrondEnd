import "./Profile.css"
import { useOutletContext } from "react-router";

function Personal() {
    const { user } = useOutletContext();
    const months = ['січня',"лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"];
    
    function ISOToBirthDate(birthDate) {
        if (!birthDate) {
            return "";
        }
        const iso = birthDate;
        const dateTime = iso.split("T");
        const date = dateTime[0].split("-");
        const month = parseInt(date[1]);
        const monthText = months[month - 1];
        return `${date[2]} ${monthText} ${date[0]}`;
    }
    const userBirthDate = ISOToBirthDate(user?.birthDate)

    return ( 
        <div>
            <div className="personal-header">
                <h2 className="personal-title">
                    Особиста інформація
                </h2>
            </div>
            {/* Info list */}
            <div className="info-list">
                {/* Name */}
                <div className="info-row">
                    <div className="info-label">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <path d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Ім'я
                    </div>
                    <span className="info-value">
                        {user?.userName}
                    </span>
                </div>
                {/* Email */}
                <div className="info-row">
                    <div className="info-label">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="14"
                                rx="2"
                            />
                            <path d="m3 7 9 6 9-6" />
                        </svg>
                        Email
                    </div>
                    <div className="email-container">
                        <span className="info-value">
                            {user?.email}
                        </span>
                        <span className="email-status email-confirmed">
                            <svg
                                className="icon status-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="m8 12 2.5 2.5L16 9" />
                            </svg>
                            Підтверджено
                        </span>
                        {/* <span className="email-status email-not-confirmed">
                            <svg
                                className="icon status-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 9l6 6M15 9l-6 6" />
                            </svg>
                            Підтвердити
                        </span> */}
                    </div>
                </div>
                {/* Birthday */}
                <div className="info-row">
                    <div className="info-label">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                            />
                            <path d="M16 3v4M8 3v4M3 11h18" />
                        </svg>
                        Дата народження
                    </div>
                    <span className="info-value">
                        {userBirthDate}
                    </span>
                </div>

                {/* Country */}
                <div className="info-row">
                    <div className="info-label">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
                            <circle cx="12" cy="10" r="2" />
                        </svg>
                        Країна
                    </div>
                    <span className="info-value">
                        {user?.country}
                    </span>
                </div>
            </div>
            {/* About */}
            <div className="about-section">
                <h3 className="about-title">
                    Про мене
                </h3>
                <div className="about-container">
                    <p className="about-text">
                        {user?.aboutMe}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Personal;
