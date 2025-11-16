import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';

const Stack = createNativeStackNavigator();
const Onboarding = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Professional</Text>
  </View>
);
const ProfessionalNavigator = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Onboarding' component={Onboarding}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfessionalNavigator;
