const initState = {
    bookings: [],
    isLoaded: false,
    isLoading: false
}


export function bookingReducer(state = initState, action){
    switch(action.type){
        case "loading_bookings":
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case "get_bookings_success":
            return {
                ...state,
                isLoaded: true,
                bookings: action.payload.items,
                isLoading: false
            };
        case "get_my_bookings_success":
            return {
                ...state,
                isLoaded: true,
                bookings: action.payload.items,
                isLoading: false
            };
        case "get_bookings_error":
            return {
                ...state,
                isLoaded: false,
                isLoading: false
            };
        case "post_booking":
            return state;
        default:
            return state;
    }
}