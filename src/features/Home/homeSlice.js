import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../user/userSlice";

export const homeSlice = createSlice({
    name: 'home',
    initialState:{
        url:{},
        genres:{},
    },
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url = action.payload
        },
        getGenres:(state,action)=>{
            state.genres = action.payload
        }
    }
})
export const {getApiConfiguration,getGenres} = homeSlice.actions
export default homeSlice.reducer