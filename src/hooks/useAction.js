import { useDispatch } from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import { actions } from "../store/reducers/actions"

export const useAction = () =>{
    const dispatch = useDispatch();
    return bindActionCreators(actions,dispatch)
}