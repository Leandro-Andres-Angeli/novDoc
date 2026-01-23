import { Children, createContext, PropsWithChildren } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import useSubscribeToAppStateChange from 'src/hooks/useSubscribeToAppStateChange';

export interface AppStateContextInterface {
  appState: AppStateStatus;
}

export const AppStateContext = createContext<AppStateContextInterface>({
  appState: AppState.currentState,
});
interface AppStateProviderProps extends PropsWithChildren {}
const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const { appState } = useSubscribeToAppStateChange();
  return (
    <AppStateContext.Provider value={{ appState }}>
      {children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
