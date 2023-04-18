import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './state/reducers/idReducer';
import { UserProvider } from './context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <BrowserRouter>
    {/* <UserProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </UserProvider> */}
  </BrowserRouter>

);


//saurav