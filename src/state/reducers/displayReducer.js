// const  reducer = (state="block",action)=>{
//     if(action.type === "menuclicked")
//     {
//         return state;
//     }
//     else if(action.type === "closeclicked")
//     {
//         return "none";
//     }
//     else{
//         return state;
//     }
// }
// export default reducer;
// import { createSlice } from "@reduxjs/toolkit";
// const initalState = {show : true};
// const displayReducer = createSlice({
//     name:"display",
//     initalState,
//     reducers:{
//         menubtnClicked(state){
//             state.show = true;
//         },
//         closebtnClicked(state){
//             state.show = !state.show;
//         }
//     },
// })

import { createSlice } from "@reduxjs/toolkit";
let initialState = { showIcon : true };
const redux = require("@reduxjs/toolkit");
const displayReducer = createSlice({
    name: "display",
    initialState,
    reducers: {
        toogleCounter(state,action) {
           return{
            ...state,
            value : action.payload
           }
        }
    }
});


export const displayActions=displayReducer.actions;

export default displayReducer;