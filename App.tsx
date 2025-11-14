import { StatusBar } from 'expo-status-bar';
import { Children, useEffect, PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebase/config';
import ToastManager from 'toastify-react-native';
import { logger } from 'react-native-logs';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import MainNavigator from './src/navigators/MainNavigator';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from './src/appContext/AuthContext';
import COLORS from 'src/constants/COLORS';

const Providers = ({ children }: PropsWithChildren) => {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme: MD3Theme & ReactNavigation.Theme = {
    ...merge(MD3LightTheme, LightTheme),
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: COLORS.primary,
      secondaryContainer: '#dcdcdcff',
      onPrimaryContainer: 'red',
      surfaceVariant: '#f2f1f1ff',
    },
  };

  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
  return (
    <AuthContextProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
  );
};
SplashScreen.preventAutoHideAsync();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <Providers>
      <>
        <MainNavigator></MainNavigator>
        <ToastManager></ToastManager>
      </>
    </Providers>
  );
}
