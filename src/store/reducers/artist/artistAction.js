import { api } from "../../../api";
export const loadArtist = (page = 2) => async(dispatch)=>{
    dispatch({type: "loading_artists"});
    try {
        const response = await api.get(`artists?page=${page}`);
        const {data} = response;
        dispatch({
            type: "get_artists_success",
            payload:{
                items: data.payload.items,
                totalPages: data.payload.total_pages,
            },
        });
    } catch (error) {
        dispatch({type: "get_artists_error"});
    }
}

export const addArtist = (artist) => async (dispatch)=> {
    try{
        const response = await api.post("artist",artist);
        dispatch({type: "post_artist"});
        return true;
    }catch{
        return false;
    }
}