import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Onboarding = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Professional</Text>
  </View>
);
const ProfessionalNavigator = () => {
  const {
    authState: { user },
    logout,
  } = useContext(AuthContext);
  return (
    <>
      <Button onPress={logout}>
        <Text>Sign out </Text>
      </Button>
      <Stack.Navigator>
        <Stack.Screen name='Onboarding' component={Onboarding}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default ProfessionalNavigator;
