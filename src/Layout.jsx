import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Navigation from './components/navigation/Navigation'
import { Outlet } from 'react-router'

function Layout({city,setCity}) {
    return (
        <>
            <Header city={city} setCity={setCity} />
            <Navigation/>

            <main>
                <Outlet />
            </main>

            <Footer/>
        </>
    )
}

export default Layout