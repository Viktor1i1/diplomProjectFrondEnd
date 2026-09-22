import { Link } from "react-router";
import "./CategoriesPages.css"
function ConcertPage(){
    return(
        <div className="concertPage">
            <div className="concert-breadcrumb">
                <Link to="/">Афіша</Link>
                    <span> » </span>
                    <span></span>
            </div>
            
        </div>
    )
}
export default ConcertPage;