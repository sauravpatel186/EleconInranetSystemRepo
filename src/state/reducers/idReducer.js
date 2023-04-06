import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";

const redux = require("@reduxjs/toolkit");
const getId=()=>{
    let achievement;
    let id;
    try{
        achievement = JSON.stringify(localStorage.getItem("achievement"));
        return id=(achievement[0]["id"].length-1);
    }
    catch(error){
        return id=0;
    }
}
const initialState = getId;
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toogleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

const store = redux.configureStore({ reducer: counterSlice.reducer });

export const counterActions = counterSlice.actions;
export default store