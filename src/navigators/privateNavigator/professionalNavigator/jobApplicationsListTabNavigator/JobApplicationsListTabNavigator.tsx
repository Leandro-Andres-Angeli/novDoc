import { View, Text } from 'react-native';
import React from 'react';
import { IJobApplicationStatus } from 'src/types/dbTypes/IJobProposal';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from 'src/providers/PublicProviders';
import utilityStyles from 'src/styles/utilityStyles';
import JOBS_APPLICATIONS_LIST_TABS_ROUTES from '../JOBS_APPLICATIONS_LIST_TABS_ROUTES';
import JobApplicationsListNavigator from './jobApplicationsListNavigator/JobApplicationsListNavigator';

export type JobApplicationsListTabNavigatorRootParams = {
  [IJobApplicationStatus.APPLIED]: {
    jobApplicationStatus: IJobApplicationStatus.APPLIED;
  };
  [IJobApplicationStatus.VIEWED]: {
    jobApplicationStatus: IJobApplicationStatus.VIEWED;
  };
  [IJobApplicationStatus.MATCH]: {
    jobApplicationStatus: IJobApplicationStatus.MATCH;
  };
  [IJobApplicationStatus.REJECTED]: {
    jobApplicationStatus: IJobApplicationStatus.REJECTED;
  };
};

const Tab =
  createMaterialTopTabNavigator<JobApplicationsListTabNavigatorRootParams>();
const JobApplicationsListTabNavigator = () => {
  const theme = useTheme<CustomTheme>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: utilityStyles.btnBorderRadius.borderRadius,

          backgroundColor: theme.colors.background,
          // backgroundColor: 'red',
        },
        tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 12 },
        tabBarItemStyle: {
          paddingHorizontal: 0,
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
      initialRouteName={JOBS_APPLICATIONS_LIST_TABS_ROUTES.match}
    >
      <Tab.Screen
        name={IJobApplicationStatus.APPLIED}
        options={{ title: `${IJobApplicationStatus.APPLIED}` }}
        component={JobApplicationsListNavigator}
        initialParams={{ jobApplicationStatus: IJobApplicationStatus.APPLIED }}
      ></Tab.Screen>

      <Tab.Screen
        name={IJobApplicationStatus.VIEWED}
        options={{ title: `${IJobApplicationStatus.VIEWED}` }}
        component={JobApplicationsListNavigator}
        initialParams={{ jobApplicationStatus: IJobApplicationStatus.VIEWED }}
      ></Tab.Screen>
      <Tab.Screen
        name={IJobApplicationStatus.MATCH}
        options={{ title: `${IJobApplicationStatus.MATCH}` }}
        component={JobApplicationsListNavigator}
        initialParams={{ jobApplicationStatus: IJobApplicationStatus.MATCH }}
      ></Tab.Screen>
      <Tab.Screen
        name={IJobApplicationStatus.REJECTED}
        options={{ title: `${IJobApplicationStatus.REJECTED}` }}
        component={JobApplicationsListNavigator}
        initialParams={{ jobApplicationStatus: IJobApplicationStatus.REJECTED }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default JobApplicationsListTabNavigator;
