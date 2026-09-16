const initState = {
    artists: [],
    isLoaded: false,
    isLoading: false,
    pageCount: 1
}

export function artistReducer(state= initState,action){
    switch(action.type){
        case "loading_artists":
            return{
                ...state,
                isLoading: true,
                isLoaded : false
            }
        case "get_artists_success":
            return { 
                ...state, 
                isLoaded: true, 
                artists: action.payload.items,
                pageCount:action.payload.totalPages, 
                isLoading: false 
            };
        case "get_artists_error":
            return { 
                ...state, 
                isLoaded: false, 
                isLoading: false 
            };
        case "post_artist":
            return state;
        default:
            return state;
    }
}


