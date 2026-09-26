import { api } from "../../../api";
export const loadUser = (page = 1) => async(dispatch)=>{
    dispatch({type: "loading_users"});
    try {
        const response = await api.get(`user?page=${page}`);
        const {data} = response;
        dispatch({
            type: "get_user_success",
            payload:{
                items: data.payload.items,
                totalPages: data.payload.total_pages,
            },
        });
    } catch (error) {
        dispatch({type: "get_user_error"});
    }
}