import "./Profile.css";
import { NavLink, Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/slices/auth/authSlice";
import { useGetUserQuery } from "../../store/services/userApi";
import profileAvatarDefault from "./profileAvatarDefault.png";
import { Helmet } from "react-helmet-async";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function logoutHandler() {
        dispatch(logout());
        navigate("/")
    }
    const { data } = useGetUserQuery();

    const user = data?.payload?.items?.[0];
    if (!user) return null
    const avatarSrc = user.image? user.image: profileAvatarDefault;

    return (
        <div className="profile-page">
            <Helmet>
                <title>Профіль</title>
            </Helmet>
            <div className="profile-overlay">
                <main className="profile-main">
                    <div className="profile-container">
                        {/* Ліва частина */}
                        <aside className="profile-sidebar">
                            {/* Аватар */}
                            <div className="profile-avatar-wrapper">
                                <div className="profile-avatar-container">
                                    <img
                                        src={avatarSrc}
                                        alt={user.userName}
                                        className="profile-avatar"/>
                                </div>
                                <h1 className="profile-name">
                                    {user.userName}
                                </h1>
                                <p className="profile-email">
                                    {user.email}
                                </p>
                            </div>
                            {/* Навігація */}
                            <nav className="profile-nav">
                                {/* Мій профіль */}
                                <NavLink
                                    to="/profile"
                                    end
                                    className={({ isActive }) => `profile-nav-item ${isActive ? "active" : "" }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M20 21a8 8 0 0 0-16 0" />
                                        <circle
                                            cx="12"
                                            cy="7"
                                            r="4"
                                        />
                                    </svg>

                                    <span>Мій профіль</span>
                                </NavLink>
                                {/*Бронювання*/}
                                <NavLink
                                    to="/profile/myBookings"
                                    className={({ isActive }) => `profile-nav-item ${isActive ? "active" : "" }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="9"/>
                                        <path d="M12 7v5l3 2" />
                                    </svg>
                                    <span>Бронювання</span>
                                </NavLink>
                                {/* Вихід */}
                                <button
                                    type="button"
                                    onClick={logoutHandler}
                                    className="logout-button"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M10 17l5-5-5-5" />
                                        <path d="M15 12H3" />
                                        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                                    </svg>
                                    <span>Вийти</span>
                                </button>
                            </nav>
                        </aside>
                        {/* Основний контент */}
                        <section className="profile-content">
                            <Outlet context={{ user }} />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Profile;
