import { Link } from "react-router";
import { useGetCategoriesQuery } from "../../store/services/categoryApi";
import "./Navigation.css";

function Navigation(){
    const {data, isLoading, isError} = useGetCategoriesQuery();

    const categoryLinks = {
        "Концерти": "concerts",
        "Фестивалі": "festivals",
        "Театр": "theatre",
        "Stand up": "stand-up",
        "Спорт": "sport",
        "Виставки": "exhibitions",
        "Для дітей": "kids",
        "Екскурсії": "excursions",
        "Зоопарк": "zoo"
    };
    const categories = data?.payload?.items || [];

    return (
        <nav className="navigation">
            <div className="navigation-container">
                <Link to="/" className="logo">KONTRAMARKA</Link>
                <div className="categories">
                    {isLoading && (<span>Завантаження...</span>)}
                    {isError && (<span>Не вдалося завантажити категорії</span>)}
                    {!isLoading && !isError &&
                        categories.map((category) => (
                            <Link key={category.id} to={categoryLinks[category.name]} className="category-link">{category.name}</Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    );
}
export default Navigation;