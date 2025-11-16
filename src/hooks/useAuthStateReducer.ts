import { useReducer, useState } from 'react';

import authStateReducer, {
  AUTH_REDUCER_ACTION_TYPES,
} from '../reducers/authStateReducer';
import {
  initialAuthState,
  IUser,
} from '../types/authContextTypes/authContextTypes';

const useAuthStateReducer = () => {
  const [authState, authDispatch] = useReducer(
    authStateReducer,
    initialAuthState
  );
  const [loading, setLoading] = useState(false);
  const login = (user: IUser) => {
    setLoading(true);
    authDispatch({
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGIN,
      payload: { logged: true, user },
    });
    setLoading(false);
  };
  const logout = () => {
    authDispatch({
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGOUT,
      payload: { user: null, logged: false },
    });
  };

  return { authState, login, logout, loading };
};

export default useAuthStateReducer;
