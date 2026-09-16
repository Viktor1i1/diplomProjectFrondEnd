import Baner from "../../components/baner/Baner";
import ArtistHome from "../../components/ArtistHome/ArtistHome";
import BtnEventsSort from "../../components/btnEventsSort/btnEventsSort";
import EventHome from "../../components/EventHome/EventHome";

function Home({city}) {
    return(
        <div>
            <div>
                <Baner city={city}/>
            </div>
            <div>
                <ArtistHome/>
            </div>
            <div>
                <BtnEventsSort/>
            </div>
            <div>
                <EventHome city={city}/>
            </div>
        </div>
    )
}

export default Home;