import { api } from "../../../api";
export const loadCategories = (page = 1)=> async(dispatch)=>{
    dispatch({type: "loading_categories" });
    try{
        const response = await api.get(`categories?page=${page}`);
        const {data} = response;
        dispatch({
            type: "get_categories_success",
            payload:{
                items: data.payload.items,
                totalPages: data.payload.total_pages,
            },
        });
    }catch(error){
        dispatch({ type: "get_categories_error" });
    }
}

export const addCategory = (category) => async (dispatch)=>{
    try {
        const response = await api.post("category",category);
        dispatch({type: "post_category"});
        return true
    } catch (error) {
        return false
    }
}