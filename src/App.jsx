import './App.css'
import { ToastContainer, Flip } from "react-toastify";
import { Routes,Route } from 'react-router'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getCookie, removeCookie } from "./services/cookieService";
import { login } from './store/slices/auth/authSlice';
import { api } from "./api";

import Layout from './Layout'
import Home from './pages/home/Home'

import Registration from './pages/regist/Regist'
import Login from './pages/login/Login'

import Profile from './pages/profile/Profile'
import Personal from "./pages/profile/Personal"
import MyBooking from './pages/profile/myBooking'

import AddEvent from './pages/event/AddEvent'
import AddArtist from './pages/artist/AddArtist'
import AddCategory from './pages/categories/AddCategory'

import ArtistDetail from './pages/artist/ArtistDetail'
import EventDetail from './pages/event/EventDetail'

import CategoriesPages from './pages/CategoriesPages/CategoriesPages'

import BookingPage from './pages/booking/BookingPage'

import ScrollToTop from './components/Scroll/Scroll';


function App() {
  const [city, setCity] = useState("Львів");

   const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);

    async function AuthorizationUser() {
        const token = getCookie("ujta");
        
        if (token) {            
            try {
                const response = await api.post("auth/validate", token, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                
                if(response.status == 200) {
                    dispatch(login(token));
                } else {
                    removeCookie("ujta");
                }
            } catch (error) {
                removeCookie("ujta");
            }
        }
    }

    useEffect(() => {
        AuthorizationUser();
    }, []);

  return (
    <>
      <ScrollToTop/>
      <Routes>
            <Route element={<Layout city={city} setCity={setCity}/>}>
                <Route path="/" element={<Home city={city} />}/>

                <Route path="/addEvent" element={<AddEvent />} />
                <Route path="/addArtist" element={<AddArtist />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/artists/:id" element={<ArtistDetail />} />
                <Route path="/events/:id" element={<EventDetail/>} />

                <Route path="/:type" element={<CategoriesPages city={city}/>}/>

                <Route path="/events/:id/booking" element={<BookingPage />} />
            </Route>

            <Route path="/profile" element={<Profile/>}>
              <Route index element={<Personal />} />
              <Route path="myBookings" element={<MyBooking />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />


        </Routes>
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
            />
    </>
  );
}

export default App



