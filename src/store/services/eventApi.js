import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./../../env"

export const eventApi = createApi({
    reducerPath : "eventsApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["Events"],
    endpoints: (build) => ({
        getEvents: build.query({
            query: (params) => ({
                url: "events",
                params: params,
            }),
            providesTags: ["Events"],
        }),

        getEvent: build.query({
            query: (id) => ({
                url: `events/${id}`,
            }),
            providesTags: ["Event"],
        }),

        getEventsForHome: build.query({
            query: (params) => ({
                url: "events",
                params: {
                    page: params?.page || 1,
                    page_size: params?.page_size || 100
                }
            })
        }),

        getArtistEvents: build.query({
            query: (artistId) => ({
                url: "events",
                params: {
                    artist_id: artistId,
                    page: 1,
                    page_size: 1000,
                },
            }),
        }),

        addEvent: build.mutation({
            query: (data) => ({
                url: "events",
                method : "POST",
                body : data,
            }),
            invalidatesTags: ["Events"],
        }),
    })
})
export const { 
    useGetEventQuery,
    useGetEventsQuery,
    useGetEventsForHomeQuery,
    useGetArtistEventsQuery,
    useAddEventMutation 
} = eventApi;