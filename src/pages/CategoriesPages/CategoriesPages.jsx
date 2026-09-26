import { Link, useParams  } from "react-router";
import { useState } from "react";
import { genres } from "../genre/genreData";
import { eventTypes } from "../genre/eventType";
import "./CategoriesPages.css"
import EventCard from "../../components/cards/EventCard";
import { useGetEventsForHomeQuery } from "../../store/services/eventApi";
import { Helmet } from "react-helmet-async";

function CategoriesPage({city}){
    const { type } = useParams(); 
    const { data, isLoading, isError,isSuccess } = useGetEventsForHomeQuery (); 
    const events = data?.payload?.items || []; 

    const category = eventTypes[type]; 
    const [selectedGenre, setSelectedGenre] = useState(null); 
    if (!category) { 
        return <div>Категорію не знайдено</div>; 
    }
    const categoryGenres = genres.filter( (genre) => 
        genre.categoryId == category.categoryId ); 
    const filteredEvents = events.filter(
        (event) =>
            event.category?.id === category.categoryId &&
            event.city === city
    );
    const genreFilteredEvents = filteredEvents.filter(
        (event) =>
            selectedGenre === null ||
            event.genre === selectedGenre
    );
    return(
        <div className="categoryPage">
            <div className="category-breadcrumb">
                <Link to="/">Афіша {city}</Link>
                    <span> » </span>
                    <span>{category.name}</span>
            </div>
            <div className="filterGenre">
                <div className="eventsGenre">
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedGenre == null}
                            onChange={() => setSelectedGenre(null)}
                        />
                        Усі жанри
                    </label>
                    {categoryGenres.map((genre) => (
                        <label key={genre.id}>
                            <input
                                type="checkbox"
                                checked={selectedGenre === genre.name}
                                onChange={() => setSelectedGenre(genre.name)}
                            />
                            {genre.name}
                        </label>
                    ))}
                </div>
            </div>
            <div className="eventHome">
                <Helmet>
                    <title>{category.name}</title>
                </Helmet>
            <div
                className="eventsList"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 220px)",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "24px",
                }}
            >
                {genreFilteredEvents.length > 0 
                    ? ( genreFilteredEvents.map((event) => ( 
                    <EventCard key={event.id} event={event} /> )) ) 
                    : ( <h2 style={{ gridColumn: "1 / -1", textAlign: "center" }}>Подій з таким жанром не знайдено</h2> )}
            </div>
        </div>
        </div>
    )
}
export default CategoriesPage;