const initState = {
    categories: [],
    isLoaded: false,
    isLoading: false,
    pageCount: 1
}

export function categoryReducer(state = initState,action){
    switch(action.type){
        case "loading_categories":
            return { 
                ...state, 
                isLoading: true, 
                isLoaded: false 
            };
        case "get_categories_success":
            return { 
                ...state, 
                isLoaded: true, 
                categories: action.payload.items,
                pageCount:action.payload.totalPages, 
                isLoading: false 
            };
        case "get_categories_error":
            return { 
                ...state, 
                isLoaded: false, 
                isLoading: false 
            };
        case "post_category":
            return state;
        default:
            return state;
    }
}