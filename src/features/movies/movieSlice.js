import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movie",
    initialState:{},
    reducers:{
      addMovie:(state,action)=>{
        state.movie =  action.payload
      }
    }
})
export const {addMovie} = movieSlice.actions
export default movieSlice.reducer
export const getAllMovies = (state=>state.movie.movie)