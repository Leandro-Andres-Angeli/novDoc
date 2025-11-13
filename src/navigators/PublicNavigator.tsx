import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();
const PublicNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Intro'} component={IntroScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PublicNavigator;
