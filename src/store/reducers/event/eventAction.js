import { api } from "../../../api";
export const loadEvents = (page = 3)=> async(dispatch)=>{
    dispatch({type: "loading_events" });
    try{
        const response = await api.get(`events?page=${page}`);
        const {data} = response;
        dispatch({
            type: "get_events_success",
            payload:{
                items: data.payload.items,
                totalPages: data.payload.total_pages,
            },
        });
    }catch(error){
        dispatch({ type: "get_events_error" });
    }
}


export const addEvent = (event) => async (dispatch) => {
    try{
        const response = await api.post("events",event);
        dispatch({type : "post_event"})
        return true;
    }catch{
        return false;
    }
}