//https://cdn.kontramarka.ua/uploads/resize/shows/logo/630x891_no-image-show-logo.webp
import { Link } from "react-router";

function ArtistCard({ artist }) {
    return (
        <Link to={`artists/${artist.id}`} style={{ textDecoration: "none" }}>
            <div className="artistCard">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="artistImage"
                />
            </div>
        </Link>
    );
}

export default ArtistCard;