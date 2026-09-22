import { useParams, Link } from "react-router";
import { useGetArtistQuery } from "../../store/services/artistApi";
import { useGetArtistEventsQuery } from "../../store/services/eventApi";
import { Helmet } from "react-helmet-async";
import "./ArtistDetail.css";

function ArtistDetail() {
    const { id } = useParams();

    const {
        data: artistData,
        isLoading: artistLoading
    } = useGetArtistQuery(id);

    const { data: eventsData, isLoading: eventsLoading } = useGetArtistEventsQuery(id);

    if (artistLoading || eventsLoading) {
        return <div className="artist-loading">Завантаження...</div>;
    }

    const artist = artistData?.payload;

    const events = (eventsData?.payload?.items || []).filter(
        (event) => event.artist?.id === Number(id)
    );

    if (!artist) {
        return <div className="artist-not-found">Артиста не знайдено</div>;
    }
    return (
        <div className="artist-page">
            <Helmet>
                <title>{artist.name}</title>
            </Helmet>
            <section className="artist-hero">
                <img
                    src="https://cityrep.fra1.cdn.digitaloceanspaces.com/wp-content/uploads/2023/04/06105907/4bef3c1b45989656071792fa5533b89c.jpg"
                    alt=""
                    className="artist-hero-background"
                />
                <div className="artist-hero-overlay"></div>
                <div className="artist-hero-content">
                    <img
                        src={artist.image}
                        alt={artist.name}
                        className="artist-photo"
                    />
                    <h1>{artist.name}</h1>
                </div>
            </section>
            <div className="artist-breadcrumb">
                <Link to="/">Афіша</Link>
                <span> » </span>
                <span>{artist.name}</span>
            </div>
            <main className="artist-content">
                <section className="artist-events-section">
                    <h2>
                        {artist.name}. Розклад подій:
                    </h2>
                    {events?.length > 0 ? (
                        <div className="artist-events-list">
                            {events.map((event) => (
                                <div className="artist-event-row" key={event.id}>
                                    <Link to={`/events/${event.id}`}>
                                        <div className="event-name" onClick={() => navigate(`/events/${event.id}`)}>
                                            {event.name || event.title || artist.name}
                                        </div>
                                    </Link>
                                    <div className="event-date">
                                        <strong>
                                            {event.date || event.datetime || "Дата уточнюється"}
                                        </strong>
                                        <span>
                                            {event.city?.name ||
                                                event.city ||
                                                event.location ||
                                                "Місто уточнюється"}
                                        </span>
                                    </div>
                                    <div className="event-price">
                                        {event.price
                                            ? `${event.price} ₴`
                                            : "Ціна уточнюється"}
                                    </div>
                                    <Link
                                        to={`/events/${event.id}`}
                                        className="event-ticket-button"
                                    >
                                        Купити квиток
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-events">
                            Наразі немає запланованих концертів.
                        </p>

                    )}

                </section>
                <section className="artist-description">
                    <h2>Біографія і творчість</h2>
                    <h3>{artist.name}</h3>
                    <div className="artist-info">
                        {artist.genre && (
                            <p>
                                <strong>Діяльність:</strong>{" "}
                                {artist.genre}
                            </p>
                        )}
                        {artist.description && (
                            <p>
                                {artist.description}
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ArtistDetail;