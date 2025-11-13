import { StatusBar } from 'expo-status-bar';
import { Children, useEffect, PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebase/config';

import { logger } from 'react-native-logs';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';
import {
  MD2DarkTheme,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import MainNavigator from './src/navigators/MainNavigator';
import {
  DefaultTheme,
  MD2LightTheme,
  MD3Theme,
  PaperProvider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from './src/appContext/AuthContext';
import COLORS from 'src/constants/COLORS';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const Providers = ({ children }: PropsWithChildren) => {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
  CombinedDefaultTheme.colors.primary = COLORS.primary;
  CombinedDefaultTheme.colors.onPrimary = 'white';
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
      <MainNavigator></MainNavigator>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
