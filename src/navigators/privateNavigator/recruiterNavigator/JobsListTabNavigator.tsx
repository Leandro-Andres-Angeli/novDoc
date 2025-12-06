import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JOBS_LIST_TABS_ROUTES from './JOBS_LIST_TABS_ROUTES';

import utilityStyles from 'src/styles/utilityStyles';
import { useTheme } from 'react-native-paper';

import { CustomTheme } from 'App';
import JobsListNavigator from './jobsListNavigator/JobsListNavigator';
type JobsListTabNavigatorRootParams = {
  [JOBS_LIST_TABS_ROUTES.activa]: {};
  [JOBS_LIST_TABS_ROUTES.pausada]: {};
  [JOBS_LIST_TABS_ROUTES.cerrada]: {};
};
const Tab = createMaterialTopTabNavigator<JobsListTabNavigatorRootParams>();
const JobsListTabNavigator = () => {
  const theme = useTheme<CustomTheme>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: utilityStyles.btnBorderRadius.borderRadius,

          backgroundColor: theme.colors.background,
        },

        tabBarItemStyle: {
          // width: 'auto',
        },

        tabBarIndicatorStyle: {},
        tabBarIndicatorContainerStyle: {
          transform: [{ scaleX: 0.97 }],
          overflow: 'hidden',
        },
        sceneStyle: {
          backgroundColor: theme.colors.primaryDynamicOpacity(0.01),
        },
      }}
    >
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.activa}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.activa}s` }}
        component={JobsListNavigator}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.pausada}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.pausada}s` }}
        component={JobsListNavigator}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.cerrada}
        component={JobsListNavigator}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.cerrada}s` }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default JobsListTabNavigator;
