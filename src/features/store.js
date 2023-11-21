import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import movieReducer from "./movies/movieSlice"
import homeReducer from "./Home/homeSlice"
const store = configureStore({
   reducer:{
    user:userReducer,
    movie:movieReducer,
    home:homeReducer
   }
})
export default store