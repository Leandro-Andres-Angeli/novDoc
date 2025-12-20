import { useReducer, useState } from 'react';

import authStateReducer, {
  AUTH_REDUCER_ACTION_TYPES,
} from '../reducers/authStateReducer';
import {
  initialAuthState,
  IUser,
} from '../types/authContextTypes/authContextTypes';
import { signOutUser } from 'src/services/auth';

const useAuthStateReducer = () => {
  const [authState, authDispatch] = useReducer(
    authStateReducer,
    initialAuthState
  );
  const [loading, setLoading] = useState(false);
  const handleLoading = (val: boolean = !loading) => {
    setLoading(val);
  };
  const login = (user: IUser) => {
    authDispatch({
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGIN,
      payload: { logged: true, user },
    });
  };
  const logout = async () => {
    const signOut = await signOutUser();
    if (!signOut.success) {
      return signOut;
    }

    return authDispatch({
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGOUT,
      payload: { user: null, logged: false },
    });
  };

  return { authState, login, logout, loading, handleLoading };
};

export default useAuthStateReducer;
