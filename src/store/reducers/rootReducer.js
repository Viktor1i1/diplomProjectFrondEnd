import { combineReducers } from "@reduxjs/toolkit";

import { authApi } from "../services/authApi";
import authReducer from "../slices/auth/authSlice"

import { eventApi } from "../services/eventApi"
import { eventReducer } from "./event/eventReducer";

import { artistReducer } from "./artist/artistReducer";
import { artistApi } from "../services/artistApi";

import { categoryApi } from "../services/categoryApi";
import { categoryReducer } from "../reducers/category/categoryReducer"

export const rootReducer = combineReducers({
    event: eventReducer,
    artist: artistReducer,
    category: categoryReducer,
    auth: authReducer,
    [authApi.reducerPath]:authApi.reducer,
    [eventApi.reducerPath]:eventApi.reducer,
    [artistApi.reducerPath]:artistApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
});

