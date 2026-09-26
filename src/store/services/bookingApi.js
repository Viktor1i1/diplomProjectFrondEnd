import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../env";
import { getCookie } from "../../services/cookieService";

export const bookingApi = createApi({
    reducerPath: "bookingsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: env.apiUrl,
        prepareHeaders: (headers) => {
            const token = getCookie("ujta");
            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }
            return headers;
        }
    }),
    tagTypes: ["Bookings"],
    endpoints: (builder) => ({
        getBookings: builder.query({
            query: () => "/bookings"
        }),
        getMyBookings: builder.query({ 
            query: (userId) => `/bookings/my?userId=${userId}`,
            providesTags: ["Bookings"]
        }),
        getBooking: builder.query({
            query: (id) => `/bookings/${id}`
        }),
        createBooking: builder.mutation({
            query: (booking) => ({
                url: "/bookings",
                method: "POST",
                body: booking
            }),
            invalidatesTags: ["Bookings"]
        }),
        updateBooking: builder.mutation({
            query: (booking) => ({
                url: "/bookings",
                method: "PUT",
                body: booking
            }),
            invalidatesTags: ["Bookings"]
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Bookings"]
        })

    })
});
export const {
    useGetBookingsQuery,
    useGetMyBookingsQuery,
    useGetBookingQuery,
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation
} = bookingApi;