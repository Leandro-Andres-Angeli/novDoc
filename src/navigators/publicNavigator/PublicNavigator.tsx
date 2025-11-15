import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../../screens/IntroScreen';
import PUBLIC_NAVIGATOR_ROUTES from './PUBLIC_NAVIGATOR_ROUTES';
import SignUpScreen from '../../screens/SignUpScreen';
import { useTheme } from 'react-native-paper';
import SignInScreen from 'src/screens/SignInScreen';

export type publicNavigatorRootStack = {
  [PUBLIC_NAVIGATOR_ROUTES.INTRO]: {};
  [PUBLIC_NAVIGATOR_ROUTES.SIGN_UP]: {};
  [PUBLIC_NAVIGATOR_ROUTES.SIGN_IN]: {};
};
const Stack = createNativeStackNavigator<publicNavigatorRootStack>();
const PublicNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name={PUBLIC_NAVIGATOR_ROUTES.INTRO}
        component={IntroScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Crear Perfil',
        }}
        name={PUBLIC_NAVIGATOR_ROUTES.SIGN_UP}
        component={SignUpScreen}
      ></Stack.Screen>
      <Stack.Screen
        name={PUBLIC_NAVIGATOR_ROUTES.SIGN_IN}
        component={SignInScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PublicNavigator;
