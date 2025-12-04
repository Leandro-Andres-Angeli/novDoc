import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JOBS_LIST_TABS_ROUTES from './JOBS_LIST_TABS_ROUTES';
import VerticalList from 'src/components/verticalList/VerticalList';
import utilityStyles from 'src/styles/utilityStyles';
import { useTheme } from 'react-native-paper';
type JobsListTabNavigatorRootParams = {
  [JOBS_LIST_TABS_ROUTES.activa]: {};
  [JOBS_LIST_TABS_ROUTES.pausada]: {};
  [JOBS_LIST_TABS_ROUTES.cerrada]: {};
};
const Tab = createMaterialTopTabNavigator<JobsListTabNavigatorRootParams>();
const JobsListTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: utilityStyles.btnBorderRadius.borderRadius,
          backgroundColor: theme.colors.background,
        },
        // tabBarIndicatorStyle: {
        //   paddingHorizontal: 20,
        //   marginHorizontal: 5,
        // },
        // tabBarIndicator(props) {
        //   return <View {...props}></View>;
        // },
      }}
    >
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.activa}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.activa}s` }}
        component={VerticalList}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.pausada}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.pausada}s` }}
        component={VerticalList}
      ></Tab.Screen>
      <Tab.Screen
        name={JOBS_LIST_TABS_ROUTES.cerrada}
        component={VerticalList}
        options={{ title: `${JOBS_LIST_TABS_ROUTES.cerrada}s` }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default JobsListTabNavigator;
