// const redux = require("redux");
// const createStore = redux.createStore;
// const DISPLAY = "display"

// const toggleDisplay=()=>{
//     return {
//         type : DISPLAY
//     }
// }

// const initalState = {
//     showIcon : false
// }

// export const reducer = (state = initalState,action) => {
//     switch(action.type){
//         case DISPLAY : return{
//             ...state,
//             showIcon : action.value
//         }
//         default : return state
//     }
// }
// const store = createStore(reducer);
// export default store;
import { createStore } from "redux";

 const initalState = {
    showIcon : false
 }

 const sidebarReducer = (state = {showIcon : false}, action) =>{
        if (action.type === "close"){
            return {
                showIcon : action.value
            };
        }
 }

 const store = createStore(sidebarReducer);
 export default store;