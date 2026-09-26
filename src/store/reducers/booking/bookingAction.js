import { api } from "../../../api";

export const loadBookings = () => async (dispatch) => {
    dispatch({ type: "loading_bookings" });

    try {
        const response = await api.get("bookings");
        const { data } = response;

        dispatch({
            type: "get_bookings_success",
            payload: {
                items: data.payload.items
            }
        });
    } catch (error) {
        dispatch({ type: "get_bookings_error" });
    }
};


export const loadMyBookings = () => async (dispatch) => {
    dispatch({ type: "loading_bookings" });

    try {
        const response = await api.get("bookings/my");
        const { data } = response;

        dispatch({
            type: "get_my_bookings_success",
            payload: {
                items: data.payload.items
            }
        });
    } catch (error) {
        dispatch({ type: "get_bookings_error" });
    }
};


export const addBooking = (booking) => async (dispatch) => {
    try {
        const response = await api.post("bookings", booking);

        dispatch({
            type: "post_booking",
            payload: response.data
        });

        return true;
    } catch (error) {
        return false;
    }
};