import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JOBS_LIST_TABS_ROUTES from '../JOBS_LIST_TABS_ROUTES';

import utilityStyles from 'src/styles/utilityStyles';
import { useTheme } from 'react-native-paper';

import JobsListNavigator from './jobsListNavigator/JobsListNavigator';

import { CustomTheme } from 'src/providers/PublicProviders';
import { jobPostingStatus } from 'src/types/dbTypes/IJobOffer';

export type JobsListTabNavigatorRootParams = {
  [JOBS_LIST_TABS_ROUTES.activa]: {
    jobStatus: jobPostingStatus.ACTIVE;
  };
  [JOBS_LIST_TABS_ROUTES.pausada]: {
    jobStatus: jobPostingStatus.PAUSED;
  };
  [JOBS_LIST_TABS_ROUTES.cerrada]: {
    jobStatus: jobPostingStatus.CLOSED;
  };
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
        tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 14 },
        tabBarIndicatorStyle: {},
        tabBarIndicatorContainerStyle: {
          transform: [{ scaleX: 0.97 }],
          overflow: 'hidden',
        },
        sceneStyle: {
          backgroundColor: theme.colors.primaryDynamicOpacity(0.01),
        },
      }}
      initialRouteName={JOBS_LIST_TABS_ROUTES.activa}
    >
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.activa}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.activa}s` }}
        component={JobsListNavigator}
        initialParams={{ jobStatus: jobPostingStatus.ACTIVE }}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.pausada}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.pausada}s` }}
        component={JobsListNavigator}
        initialParams={{ jobStatus: jobPostingStatus.PAUSED }}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.cerrada}
        component={JobsListNavigator}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.cerrada}s` }}
        initialParams={{ jobStatus: jobPostingStatus.CLOSED }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default JobsListTabNavigator;
