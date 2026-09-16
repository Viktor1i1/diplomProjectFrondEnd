import { useState } from "react";
import { useGetArtistsQuery } from "../../store/services/artistApi";
import ArtistCard from "../cards/ArtistCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ArtistHome.css";

function ArtistHome() {
    const [startIndex, setStartIndex] = useState(0);

    const { data, isLoading, isSuccess, isError } = useGetArtistsQuery({ page: 1, page_size: 100 });

    const artists = data?.payload?.items || [];

    function nextArtist() {
        if (startIndex + 15 < artists.length) {
            setStartIndex(startIndex + 1);
        }
    }

    function previousArtist() {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    }

    if (isError) {
        return <h2>Помилка завантаження артистів</h2>;
    }

    return (
        <div className="artistsHome">
            <button
                className="artistArrow"
                onClick={previousArtist}
                disabled={startIndex === 0}>
                <ArrowBackIosIcon />
            </button>
            <div className="artistsList">
                {isSuccess &&
                    artists.slice(startIndex, startIndex + 15).map((artist) => (
                            <ArtistCard key={artist.id} artist={artist}/>))}
            </div>
            <button
                className="artistArrow"
                onClick={nextArtist}
                disabled={startIndex + 15 >= artists.length}>
                <ArrowForwardIosIcon />
            </button>
        </div>
    );
}

export default ArtistHome;