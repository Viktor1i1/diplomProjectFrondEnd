import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import {
    GoogleOAuthProvider,
    GoogleLogin,
    useGoogleLogin,
} from "@react-oauth/google";
import { env } from "../../env";
import { jwtDecode } from "jwt-decode";
import { api } from "./../../api";
import { login } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { setCookie } from "../../services/cookieService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
const cardContainer = {
    maxWidth: "470px",
    width: "90%",
    margin: "100px auto",
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

function Login() {
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Наша функція submit
    async function formSubmit(values) {
        try {
            const response = await api.post("auth/login", values);
            const { data } = response;
            const token = data.payload;
            console.log("LOGIN DATA:", data);
            console.log("TOKEN:", token);
            if (values.rememberMe) {
                setCookie("ujta", token, 24);
            } else {
                setCookie("ujta", token);
            }

            dispatch(login(token));
            // Перекинути на головну сторінку
            navigate("/", { replace: true });
        } catch (error) {
            const { response } = error;
            const { data } = response;
            console.log("ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("SERVER RESPONSE:", error.response?.data);
            toast.error(data.message);
            setLoginError(data.message);
        }
    }

    const initValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const schema = Yup.object({
        email: Yup.string()
            .required("Обов'язкове поле")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Невірний формат пошти",
            ),
        password: Yup.string()
            .required("Обов'язкове поле")
            .min(6, "Мінімум 6 символів"),
    });

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: formSubmit,
        validationSchema: schema,
    });

    // google auth
    function googleSuccessHandler(response) {
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

    function googleErrorHandler(error) {
        console.log(error);
    }

    return (
        <GoogleOAuthProvider clientId={env.googleClientId}>
            <div style={cardContainer}>
                <Helmet>
                    <title>Вхід</title>
                </Helmet>
                <h1>Вхід</h1>
                <form
                    action="/login"
                    method="get"
                    onSubmit={formik.handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0px auto",
                    }}
                >
                    <div style={fieldsGroup}>
                        <div style={formLabel}>
                            <label>Пошта</label>
                        </div>
                        <input
                            name="email"
                            style={formInput}
                            type="email"
                            autoComplete="email"
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
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <div style={errorStyle}>
                            {formik.errors.password
                                ? formik.errors.password
                                : ""}
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

                    <div>
                        <span
                            style={errorStyle}
                        >
                            {loginError}
                        </span>
                    </div>

                    <div style={{ margin: "15px 0px" }}>
                        <input
                            style={submitStyle}
                            type="submit"
                            value="Увійти"
                        />
                    </div>
                    <GoogleLogin
                        type="standart"
                        theme="filled_black"
                        size="large"
                        text="continue_with"
                        shape="circle"
                        logo_alignment="center"
                        onSuccess={googleSuccessHandler}
                        onError={googleErrorHandler}
                    />
                </form>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;