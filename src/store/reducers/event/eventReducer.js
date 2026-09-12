const initState = {
    events: [],
    isLoaded: false,
    isLoading: false,
    pageCount: 1
}


export function eventReducer(state = initState,action){
    switch(action.type){
        case "loading_events":
            return { 
                ...state, 
                isLoading: true, 
                isLoaded: false 
            };
        case "get_events_success":
            return { 
                ...state, 
                isLoaded: true, 
                events: action.payload.items,
                pageCount:action.payload.totalPages, 
                isLoading: false 
            };
        case "get_events_error":
            return { 
                ...state, 
                isLoaded: false, 
                isLoading: false 
            };
        case "post_event":
            return state;
        default:
            return state;
    }
}