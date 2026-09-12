import { useFormik } from "formik";
import { useEffect } from "react";
import { useAction} from "../../hooks/useAction"
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Spiner from "../../components/spiner/Spiner";
import { toast } from "react-toastify";
import { useAddArtistMutation } from "../../store/services/artistApi";
import { Helmet } from "react-helmet-async";
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


function AddArtist(){
    const navigate = useNavigate();
    const { loadArtist } = useAction();
    const [addArtist , {isError,isSuccess,isLoading}] = useAddArtistMutation();
    
    useEffect(()=>{
        window.scrollTo({ top: 0 });
        loadArtist();
    })

    async function submitHandler(values){
        try {
            const res = await addArtist(values).unwrap();
            toast.success("Артиста додано")
        } catch (error) {
            toast.error("Помилка під час додавання артиста")
        }
    }

    const initValues = {
        name: "",
        image: "",
        description: "",
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
                <title>Додавання артиста</title>
            </Helmet>
            <h1>Додавання артиста</h1>
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
                        <label>Ім'я/Псевдонім</label>
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
                        <label>Фото</label>
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

                <div style={{ margin: "15px 0px" }}>
                    <input style={submitStyle} type="submit" value="Додати" />
                </div>
            </form>
        </div>
    )
}
export default AddArtist;