import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MAIN_NAVIGATOR_ROUTES from './MAIN_NAVIGATOR_ROUTES';
import { SafeAreaView } from 'react-native-safe-area-context';
import IntroScreen from '../screens/LoginScreen';
import { AuthContext } from '../appContext/AuthContext';
import Loading from '../ui/Loading';
import PublicNavigator from './PublicNavigator';

function MainNavigator() {
  const {
    authState: { logged },
  } = useContext(AuthContext);
  // return <Loading></Loading>;
  if (!logged) {
    return <PublicNavigator></PublicNavigator>;
  }
  return <Loading></Loading>;
}
export default MainNavigator;
