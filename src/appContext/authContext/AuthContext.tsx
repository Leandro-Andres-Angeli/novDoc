import { createContext, PropsWithChildren } from 'react';
import {
  IAuthState,
  UserTypes,
} from '../../types/authContextTypes/authContextTypes';
import useAuthStateReducer from '../../hooks/useAuthStateReducer';
import { FirebaseErrorResponse } from 'src/types/firebaseResponse/firebaseResponses';

export interface AuthContextInterface {
  authState: IAuthState;
  login: (user: UserTypes) => void;
  logout: () => Promise<FirebaseErrorResponse | void>;
  loading: boolean;
  handleLoading: (val?: boolean) => void;
}
export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

interface AuthContextProviderProps extends PropsWithChildren {}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { authState, login, logout, loading, handleLoading } =
    useAuthStateReducer();
  return (
    <AuthContext.Provider
      value={{ authState, login, logout, loading, handleLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
