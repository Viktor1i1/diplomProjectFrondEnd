import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./../../env"

export const usersApi = createApi({
    reducerPath : "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["Users"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => ({
                url: `user`,
            }),
            providesTags: ["User"],
        }),
    })
})
export const {
    useGetUserQuery,
} = usersApi