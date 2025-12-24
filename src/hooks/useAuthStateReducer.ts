import { useReducer, useState } from 'react';

import authStateReducer, {
  AUTH_REDUCER_ACTION_TYPES,
} from '../reducers/authStateReducer';
import {
  initialAuthState,
  IUser,
  UserTypes,
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
  const login = (user: UserTypes) => {
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

  const updateUserData = (user: UserTypes) => {
    authDispatch({
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_UPDATE,
      payload: { user },
    });
  };

  return { authState, login, logout, loading, handleLoading, updateUserData };
};

export default useAuthStateReducer;
