import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
    removeCookie,
    setCookie
} from "../../../services/cookieService";

const initialState = {
    user: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        login(state, action) {

            try {

                const token = typeof action.payload === "string"
                    ? action.payload
                    : action.payload.token;

                const image = typeof action.payload === "string"
                    ? null
                    : action.payload.image;

                const user = jwtDecode(token);

                if (user) {
                    delete user.aud;
                    delete user.exp;
                    delete user.iss;

                    state.isAuth = true;

                    state.user = {
                        ...user,
                        image: image || user.image || user.picture || ""
                    };

                    setCookie("ujta", token);
                }


            } catch (error) {

                console.log(error);

            }
        },

        logout(state) {

            state.user = null;
            state.isAuth = false;

            removeCookie("ujta");
        }
    }
});

export const {
    login,
    logout
} = authSlice.actions;

export default authSlice.reducer;