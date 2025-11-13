import React from 'react';
import { IAuthState, IUser } from '../types/authContextTypes/authContextTypes';
export enum AUTH_REDUCER_ACTION_TYPES {
  AUTH_REDUCER_ACTION_TYPE_LOGOUT = 'AUTH_REDUCER_ACTION_TYPE_LOGOUT',
  AUTH_REDUCER_ACTION_TYPE_LOGIN = 'AUTH_REDUCER_ACTION_TYPE_LOGIN',
}
export type authStateReducerActionsType = {
  type: AUTH_REDUCER_ACTION_TYPES;
  payload: IAuthState;
};
export type authStateReducerActions =
  | {
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGIN;
      payload: { logged: true; user: IUser };
    }
  | {
      type: AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGOUT;
      payload: { logged: false; user: null };
    };

export const authStateReducer = (
  state: IAuthState,
  action: authStateReducerActions
): IAuthState => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGIN:
      return { ...state, ...action.payload };

    case AUTH_REDUCER_ACTION_TYPES.AUTH_REDUCER_ACTION_TYPE_LOGOUT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default authStateReducer;
