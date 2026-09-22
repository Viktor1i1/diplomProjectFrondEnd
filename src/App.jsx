import './App.css'
import { Routes,Route } from 'react-router'
import { useState } from 'react'
import Layout from './Layout'
import Home from './pages/home/Home'

import Registration from './pages/regist/Regist'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

import AddEvent from './pages/event/AddEvent'
import AddArtist from './pages/artist/AddArtist'
import AddCategory from './pages/categories/AddCategory'

import ArtistDetail from './pages/artist/ArtistDetail'
import EventDetail from './pages/event/EventDetail'

import ConcertPage from './pages/CategoriesPages/ConcertPage'
function App() {
  const [city, setCity] = useState("Львів");
  return (
    <>
      <Routes>
            <Route element={<Layout city={city} setCity={setCity}/>}>
                <Route path="/" element={<Home city={city} />}/>

                <Route path="/addEvent" element={<AddEvent />} />
                <Route path="/addArtist" element={<AddArtist />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/artists/:id" element={<ArtistDetail />} />
                <Route path="/events/:id" element={<EventDetail/>} />

                <Route path="/concerts" element={<ConcertPage/>} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Registration />} />


        </Routes>
    </>
  );
}

export default App



