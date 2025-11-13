import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebase/config';

import { NavigationContainer } from '@react-navigation/native';
import { logger } from 'react-native-logs';
import MainNavigator from './src/navigator/MainNavigator';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import AuthContextProvider from './src/appContext/AuthContext';
// Set the animation options. This is optional.
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <AuthContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <MainNavigator></MainNavigator>
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
    // <View style={styles.container}>
    //   <Text>Test</Text>
    //   <StatusBar style='auto' />
    // </View>
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
