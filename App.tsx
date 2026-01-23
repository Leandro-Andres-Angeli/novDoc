import { useEffect } from 'react';

import ToastManager from 'toastify-react-native';

import MainNavigator from './src/navigators/MainNavigator';

import * as SplashScreen from 'expo-splash-screen';

import PublicProviders from 'src/providers/PublicProviders';
import useSubscribeToAppStateChange from 'src/hooks/useSubscribeToAppStateChange';
import AppStateProvider from 'src/appContext/appStateContext/AppStateContext';

SplashScreen.preventAutoHideAsync();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <AppStateProvider>
      <PublicProviders>
        <>
          <MainNavigator></MainNavigator>
          <ToastManager></ToastManager>
        </>
      </PublicProviders>
    </AppStateProvider>
  );
}
