import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PUBLIC_NAVIGATOR_ROUTES from './PUBLIC_NAVIGATOR_ROUTES';

import { useTheme } from 'react-native-paper';

import AppHeader from '@ui/AppHeader';
import { BlurView } from 'expo-blur';
import IntroScreen from 'src/screens/public/IntroScreen';
import SignUpScreen from 'src/screens/public/SignUpScreen';
import SignInScreen from 'src/screens/public/SignInScreen';

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
        options={{
          header: () => (
            <AppHeader>
              <Text></Text>
            </AppHeader>
          ),
          headerShown: true,
        }}
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
        options={{
          header: () => (
            <BlurView intensity={30}>
              <AppHeader></AppHeader>
            </BlurView>
          ),
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
        name={PUBLIC_NAVIGATOR_ROUTES.SIGN_IN}
        component={SignInScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PublicNavigator;
