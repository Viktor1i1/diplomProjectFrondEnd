import { Link } from "react-router";
import { useGetCategoriesQuery } from "../../store/services/categoryApi";
import "./Navigation.css";

function Navigation(){
    const {data, isLoading, isError} = useGetCategoriesQuery();

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
                            <Link key={category.id} to="#" className="category-link">{category.name}</Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    );
}
export default Navigation;