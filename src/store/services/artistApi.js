import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./../../env"

export const artistApi = createApi({
    reducerPath : "artistsApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["Artists"],
    endpoints: (build) => ({
        getArtists: build.query({
            query: (params) => ({
                url: "artists",
                params: params,
             }),
            providesTags: ["Artists"],
        }),
        
        getArtist: build.query({
            query: (id) => ({
                url: `artists/${id}`,
            }),
            providesTags: ["Artist"],
        }),

        addArtist : build.mutation({
            query: (data)=>({
                url: "artists",
                method: "POST",
                body : data,
            }),
            invalidatesTags : ["Artists"],
        }),


    })
})

export const {
    useGetArtistQuery,
    useGetArtistsQuery,
    useAddArtistMutation,
} = artistApi;