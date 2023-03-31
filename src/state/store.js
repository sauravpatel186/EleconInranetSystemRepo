// import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from "./reducers/displayReducer";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./reducers/displayReducer";
// export const store = createStore(reducers,{},applyMiddleware(thunk))
const store = configureStore({ reducer: displayReducer.reducer });

export default store;