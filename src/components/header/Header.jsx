import { Link } from "react-router";
import CitySelector from "./citySelector/CitySelector";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/slices/auth/authSlice";
import defaultAvatar from"./avatar.png"
import "./Header.css";

function Header({ city, setCity }) {
    const dispatch = useDispatch();
    const {isAuth, user} = useSelector((state) => state.auth);
    function logoutHandler() {
        dispatch(logout());
    }
    return (
        <header className="header">
            <div className="header-nav">
                {
                    isAuth 
                    ? (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Link style={{marginRight: "20px"}} to="/profile" className="nav-link">
                                <img style={{marginRight: "20px", borderRadius: "50%"}} alt={user.email} width="40px" height="40px" src={user.image ? user.image : defaultAvatar}/>
                            </Link>
                            <Link onClick={logoutHandler} className="nav-link">Вийти</Link>
                        </div>
                    )
                    : (
                        <div>
                            <Link style={{marginRight: "20px"}} to="/register" className="nav-link">Зареєструватись</Link>
                            <Link to="/login" className="nav-link">Увійти</Link>
                        </div>
                    )
                }
                <CitySelector city={city} setCity={setCity}/>
                <Link to="/addEvent" className="nav-link">Додати подію</Link>
                <Link to="/addArtist" className="nav-link">Додати артиста</Link>
            </div>
        </header>
    );
}
export default Header;