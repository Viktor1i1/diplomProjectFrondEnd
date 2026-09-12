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

        addEvent: build.mutation({
            query: (data) => ({
                url: "events",
                method : "POST",
                body : data,
            }),
            invalidatesTags: ["Events"],//дані будуть невалідні
        }),
    })
})
export const { 
    useGetEventQuery,
    useGetEventsQuery,
    useAddEventMutation 
} = eventApi;