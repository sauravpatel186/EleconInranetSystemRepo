import React from 'react';
import { useSetState } from 'react-use';
import { isAuthenticated } from '../service/authservice';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});

  const login = (email, password,role) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin( email, password,role, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = (email, password,role, callback) => 
  setTimeout(() => {
    if (isAuthenticated()) {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);