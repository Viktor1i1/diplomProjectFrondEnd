import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { GoogleOAuthProvider, GoogleLogin,useGoogleLogin,} from "@react-oauth/google";
import { env } from "../../env";
import { jwtDecode } from "jwt-decode";
import { api } from "../../api";
import { login } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { setCookie } from "../../services/cookieService";
import { toast } from "react-toastify";
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

function Registration() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function formSubmit(values) {
        try {
            console.log(values);
            const response = await api.post("auth/register", values);
            const { data } = response;
            const token = data.payload;

            setCookie("ujta", token, 24);
            login({
                token: token,
                image: values.image})

            navigate("/", {replace: true});
        } catch (error) {
            const { response } = error;
            const { data } = response;
            console.log("ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("SERVER RESPONSE:", error.response?.data);
            toast.error(data.message);
        }
        
    }

    const initValues = {
        username:"",
        firstName: "",
        lastName: "",
        image : "",
        email: "",
        password: "",
        rememberMe: false,
    };

    const schema = Yup.object({
        username: Yup.string()
            .required("Обов'язкове поле")
            .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9_.'-]{2,30}$/,"Невірний формат username"),
        firstName: Yup.string()
            .required("Обов'язкове поле")
            .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{2,30}$/,"Невірний формат імені"),
        lastName: Yup.string()
            .required("Обов'язкове поле")
            .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{2,30}$/,"Невірний формат прізвища"),
        image: Yup.string(),
        email: Yup.string()
            .required("Обов'язкове поле")
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Невірний формат пошти"),
        password: Yup.string().required("Обов'язкове поле").min(6, "Мінімум 6 символів"),
    });

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: formSubmit,
        validationSchema: schema,
    });

    function googleSuccessHandler(response){
        const token = response.credential;

        const googleUser = jwtDecode(token);

        console.log("GOOGLE USER:", googleUser);
        console.log("GOOGLE IMAGE:", googleUser.picture);

        setCookie("ujta", token, 24);

        dispatch(login({
            token: token,
            image: googleUser.picture
        }));
        navigate("/", { replace: true });
    }

    function googleErrorHandler(response){
        console.log(response)
    }

    return (
        <GoogleOAuthProvider clientId={env.googleClientId}>
            <div style={cardContainer}>
                <h1>Реєстрація</h1>
                <Helmet>
                    <title>Реєстрація</title>
                </Helmet>
                <form
                    onSubmit={formik.handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0px auto"
                    }}
                >
                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Username</label>
                        </div>
                        <input
                            name="username"
                            style={formInput}
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.username ? formik.errors.username : ""}
                        </div>
                    </div>
                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Ім'я</label>
                        </div>
                        <input
                            name="firstName"
                            style={formInput}
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.firstName ? formik.errors.firstName : ""}
                        </div>
                    </div>
                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Прізвище</label>
                        </div>
                        <input
                            name="lastName"
                            style={formInput}
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.lastName ? formik.errors.lastName : ""}
                        </div>
                    </div>
                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Фото</label>
                        </div>
                        <input
                            name="image"
                            style={formInput}
                            type="text"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.image ? formik.errors.image : ""}
                        </div>
                    </div>

                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Пошта</label>
                        </div>
                        <input
                            name="email"
                            style={formInput}
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.email ? formik.errors.email : ""}
                        </div>
                    </div>

                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Пароль</label>
                        </div>
                        <input
                            name="password"
                            style={formInput}
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.password ? formik.errors.password : ""}
                        </div>
                    </div>

                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <input
                                name="rememberMe"
                                style={formCheckbox}
                                type="checkbox"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                            />
                            <label>Запам'ятати мене</label>
                        </div>
                    </div>
                    <div style={{ margin: "15px 0px" }}>
                        <input style={submitStyle} type="submit" value="Зареєструватись" />
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }}>
                        <GoogleLogin
                            type="standard"
                            theme="filled_black"
                            size="large"
                            text="continue_with"
                            shape="circle"
                            logo_alignment="center"
                            onSuccess={googleSuccessHandler}
                            onError={googleErrorHandler}
                        />
                    </div>
                </form>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Registration;