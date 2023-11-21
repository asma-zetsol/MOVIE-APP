import { createSlice } from "@reduxjs/toolkit";
const initialState={
  userData:null,
  loading:true
}
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers:{
    addUser:(state,action)=>{
        state.userData =  action.payload
        state.loading = false
    },
    removeUser:(state,action)=>{
      state.userData = null
    }
   }
})
export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer