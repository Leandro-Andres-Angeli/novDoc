import { createContext, PropsWithChildren } from 'react';
import {
  IAuthState,
  UserTypes,
} from '../types/authContextTypes/authContextTypes';
import useAuthStateReducer from '../hooks/useAuthStateReducer';

export interface authContextInterface {
  authState: IAuthState;
  login: (user: UserTypes) => void;
  logout: () => void;
  loading: boolean;
}
export const AuthContext = createContext<authContextInterface>(
  {} as authContextInterface
);

interface AuthContextProviderProps extends PropsWithChildren {}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { authState, login, logout, loading } = useAuthStateReducer();
  return (
    <AuthContext.Provider value={{ authState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
