import { createContext, PropsWithChildren } from 'react';
import { IAuthState, IUser } from '../types/authContextTypes/authContextTypes';
import useAuthStateReducer from '../hooks/useAuthStateReducer';

export interface authContextInterface {
  authState: IAuthState;
  login: (user: IUser) => void;
  logout: () => void;
}
export const AuthContext = createContext<authContextInterface>(
  {} as authContextInterface
);

interface AuthContextProviderProps extends PropsWithChildren {}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { authState, login, logout } = useAuthStateReducer();
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
