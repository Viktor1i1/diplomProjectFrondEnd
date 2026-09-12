import { useFormik } from "formik";
import { useEffect } from "react";
import { useAction} from "../../hooks/useAction"
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Spiner from "../../components/spiner/Spiner";
import { toast } from "react-toastify";
import { useAddEventMutation} from "../../store/services/eventApi"
import { loadCategories } from "../../store/reducers/category/categoryAction";
import { Helmet } from "react-helmet-async";
import { genres } from "../genre/genreData";


const cardContainer = {
    maxWidth: "470px",
    width: "90%",
    margin: "30px auto",
    padding: "26px 23px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, sans-serif",
    textAlign: "center"
};

const fieldsGroup = {
    display: "flex",
    flexDirection: "column",
    margin: "6px 0px",
};

const formLabel = {
    textAlign: "start",
    color: "#333",
    fontWeight: "600",
    fontSize: "0.9em",
};

const formInput = {
    fontSize: "1em",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    marginTop: "4px",
    boxSizing: "border-box",
    width: "100%",
};

const formCheckbox = {
    transform: "scale(1.2)",
    marginRight: "8px",
    cursor: "pointer"
};

const submitStyle = {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#aa3bff1a",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.2s"
};

const errorStyle = { 
    fontSize: "0.75em", 
    color: "coral",
    whiteSpace: "nowrap",
    textAlign: "start", 
    height: "18px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "18px",
    marginTop: "2px"
};


function AddEvent(){
    const navigate = useNavigate();
    const { loadEvents,loadCategories,loadArtist } = useAction();
    const { categories, isLoading : categoryLoading, isLoaded : categoryLoaded } = useSelector(
        (state) => state.category,
    );
    const { artists, isLoading : artistLoading, isLoaded : artistLoaded } = useSelector(
        (state) => state.artist,
    );
    const [addEvent , {isError,isSuccess,isLoading}] = useAddEventMutation();
    

    useEffect(()=>{
        window.scrollTo({ top: 0 });
        loadEvents();
        loadCategories();
        loadArtist();
    },[])

    async function submitHandler(values){
        try {
            const eventData = {
                ...values,
                categoryId: Number(values.categoryId),
                artistId: Number(values.artistId),
                duration: Number(values.duration),
                price: Number(values.price),
            };

            console.log("Дані перед відправкою:", eventData);

            await addEvent(eventData).unwrap();

            toast.success("Подію додано");
        } catch (error) {
            console.log("Помилка:", error);
            toast.error("Помилка під час додавання події");
        }
    }

    const initValues = {
        name: "",
        description: "",
        image: "",
        date: "",
        time: "",
        city: "",
        address: "",
        genre : "",
        duration: 0,
        price: 0,
        categoryId: "",
        artistId: 0
    }

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: submitHandler,
    })

    if(isLoading){
        return <Spiner/>;
    }
    return(
        <div style={cardContainer}>
            <Helmet>
                <title>Додавання події</title>
            </Helmet>
            <h1>Додавання події</h1>
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0px auto",
                }}
            >
                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Назва</label>
                    </div>
                    <input
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        name="name"
                        style={formInput}
                        type="text"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Опис</label>
                    </div>
                    <input
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                        style={formInput}
                        type="text"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Зображення</label>
                    </div>
                    <input
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        name="image"
                        style={formInput}
                        type="text"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Дата проведення</label>
                    </div>
                    <input
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        name="date"
                        style={formInput}
                        type="date"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Час проведення</label>
                    </div>
                    <input
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        name="time"
                        style={formInput}
                        type="time"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Місто</label>
                    </div>
                    <input
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        name="city"
                        style={formInput}
                        type="text"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Адреса</label>
                    </div>
                    <input
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        name="address"
                        style={formInput}
                        type="text"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Тривалість(хв)</label>
                    </div>
                    <input
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        name="duration"
                        style={formInput}
                        type="number"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Ціна</label>
                    </div>
                    <input
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        name="price"
                        style={formInput}
                        type="number"
                    />
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Категорія</label>
                    </div>

                    <select
                        name="categoryId"
                        value={formik.values.categoryId}
                        style={formInput}
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue("genre", "");
                        }}
                        onBlur={formik.handleBlur}
                        >
                        <option value="">Оберіть категорію</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                            </option>
                        ))}
                    </select>
                    <div style={formLabel}>
                        <label>Жанри</label>
                    </div>
                        <select
                        name="genre"
                        style={formInput}
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!formik.values.categoryId}
                        >
                        <option value="">
                            {formik.values.categoryId
                            ? "Оберіть жанр"
                            : "Спочатку оберіть категорію"}
                        </option>

                        {genres
                            .filter(
                            (genre) =>
                                Number(genre.categoryId) === Number(formik.values.categoryId)
                            )
                            .map((genre) => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                            ))}
                        </select>
                </div>

                <div style={fieldsGroup}>
                    <div style={formLabel}>
                        <label>Артист</label>
                    </div>
                    <select
                        value={formik.values.artistId}
                        onChange={formik.handleChange}
                        name="artistId"
                        style={formInput}
                        type="number"
                    >
                        <option value={0}></option>
                        {artistLoaded &&
                            artists.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div style={{ margin: "15px 0px" }}>
                    <input style={submitStyle} type="submit" value="Додати" />
                </div>
            </form>
        </div>
    )
}
export default AddEvent;