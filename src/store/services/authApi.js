import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../env";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: env.apiUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data
            })
        }),
        login: build.mutation({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: data
            })
        }),
        getMe: build.query({
            query: () => ({
                url: "auth/me"
            })
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery
} = authApi;