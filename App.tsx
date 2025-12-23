import { useEffect } from 'react';

import ToastManager from 'toastify-react-native';

import MainNavigator from './src/navigators/MainNavigator';

import * as SplashScreen from 'expo-splash-screen';

import PublicProviders from 'src/providers/PublicProviders';

SplashScreen.preventAutoHideAsync();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <PublicProviders>
      <>
        <MainNavigator></MainNavigator>
        <ToastManager></ToastManager>
      </>
    </PublicProviders>
  );
}
