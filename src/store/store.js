import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer"
import { authApi } from "./services/authApi";
import { eventApi} from "./services/eventApi";
import { artistApi } from "./services/artistApi";
import { categoryApi } from "./services/categoryApi";
import { usersApi } from "./services/userApi";
import { bookingApi } from "./services/bookingApi";
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            eventApi.middleware,
            artistApi.middleware,
            categoryApi.middleware,
            usersApi.middleware,
            bookingApi.middleware
        ),
});