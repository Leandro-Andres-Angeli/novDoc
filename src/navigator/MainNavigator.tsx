import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MAIN_NAVIGATOR_ROUTES from './MAIN_NAVIGATOR_ROUTES';
import { SafeAreaView } from 'react-native-safe-area-context';
import IntroScreen from '../screens/LoginScreen';
const mainNavigatorRootParams = {
  [MAIN_NAVIGATOR_ROUTES.PRIVATE_NAVIGATOR]: {},
  [MAIN_NAVIGATOR_ROUTES.PUBLIC_NAVIGATOR]: {},
};

const Stack = createNativeStackNavigator<typeof mainNavigatorRootParams>();
function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MAIN_NAVIGATOR_ROUTES.PUBLIC_NAVIGATOR}
    >
      <Stack.Screen
        name={MAIN_NAVIGATOR_ROUTES.PUBLIC_NAVIGATOR}
        component={IntroScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
export default MainNavigator;
