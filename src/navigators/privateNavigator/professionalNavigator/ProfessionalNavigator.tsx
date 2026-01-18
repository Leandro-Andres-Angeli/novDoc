import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Button, Icon, useTheme } from 'react-native-paper';
import PROFESSIONAL_NAVIGATOR_ROUTES from './PROFESSIONAL_NAVIGATOR_ROUTES';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTheme } from 'src/providers/PublicProviders';
import materialBottomTabBar from '@utils/materialBottomTabBar/materialBottomTabBar';
import AppHeaderWithSettingsLink from '@components/shared/AppHeaderWithSettingsLink';
import SwipeProfessional from 'src/screens/private/professional/SwipeProfessional';

const Stack = createNativeStackNavigator();
const Onboarding = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Professional</Text>
  </View>
);

export type ProfessionalNavigatorRootParams = {
  [PROFESSIONAL_NAVIGATOR_ROUTES.SWIPE]: {};
  [PROFESSIONAL_NAVIGATOR_ROUTES.CHAT_ROOMS]: {};
  [PROFESSIONAL_NAVIGATOR_ROUTES.FAVORITES]: {};
  [PROFESSIONAL_NAVIGATOR_ROUTES.PROFILE]: {};
  // [RECRUITER_NAVIGATOR_ROUTES.SWIPE]: {};
  // [RECRUITER_NAVIGATOR_ROUTES.PROFILE]: {};
  // [RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS]: {};
  // [RECRUITER_NAVIGATOR_ROUTES.CHAT_ROOMS]: {};
  // [RECRUITER_NAVIGATOR_ROUTES.FAVORITES]: {};
};
const Tab = createBottomTabNavigator<ProfessionalNavigatorRootParams>();
const ProfessionalNavigator = () => {
  const {
    authState: { user },
    logout,
  } = useContext(AuthContext);
  const theme = useTheme<CustomTheme>();
  return (
    <>
      <Button onPress={logout}>
        <Text>Sign out </Text>
      </Button>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },

          sceneStyle: {
            backgroundColor: theme.colors.primaryDynamicOpacity(0.01),
          },
          animation: 'shift',
        }}
        tabBar={(props) => materialBottomTabBar({ ...props, theme })}
      >
        <Tab.Screen
          options={{
            headerShown: true,
            header: () => (
              <AppHeaderWithSettingsLink title='Postulaciones'></AppHeaderWithSettingsLink>
            ),
            title: 'Postulaciones',
            tabBarLabel: 'Descubrir',

            tabBarIcon: (props) => {
              return (
                <Icon
                  theme={theme}
                  size={24}
                  color={theme.colors.primary}
                  source={
                    !props.focused ? 'account-group-outline' : 'account-group'
                  }
                ></Icon>
              );
            },
          }}
          name={PROFESSIONAL_NAVIGATOR_ROUTES.SWIPE}
          component={SwipeProfessional}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
/* const ProfessionalNavigator = () => {
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
}; */

export default ProfessionalNavigator;
