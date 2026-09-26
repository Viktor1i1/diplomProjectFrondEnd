const initState = {
    users: [],
    isLoaded: false,
    isLoading: false,
    pageCount: 1
}
export function userReducer(state = initState,action){
    switch(action.type){
        case "loading_users":
            return{
                ...state,
                isLoading: true,
                isLoaded : false
            }
        case "get_users_success":
            return { 
                ...state, 
                isLoaded: true,
                users: action.payload.items,
                pageCount:action.payload.totalPages, 
                isLoading: false 
            };
        case "get_users_error":
            return { 
                ...state, 
                isLoaded: false, 
                isLoading: false 
            };
        default:
            return state;
    }
}