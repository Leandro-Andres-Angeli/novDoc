import { View, Text } from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import RecruiterProfileStack from './RecruiterProfileStack';
import AppHeaderWithSettingsLink from '@components/shared/AppHeaderWithSettingsLink';
import { Button, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import AppDrawerContent from '@components/shared/AppDrawerContent';
const RECRUITER_PROFILE_DRAWER_ROUTES = {
  RECRUITER_PROFILE_STACK: 'RECRUITER_PROFILE_STACK',
  SIGN_OUT: 'SIGN_OUT',
  EDIT_PROFILE: 'EDIT_PROFILE',
} as const;
export type recruiterProfileDrawerRoute =
  keyof typeof RECRUITER_PROFILE_DRAWER_ROUTES;
export const recruiterProfileDrawerRootStack: Record<
  recruiterProfileDrawerRoute,
  any
> = {
  RECRUITER_PROFILE_STACK: {},
  EDIT_PROFILE: {},
  SIGN_OUT: {},
};
const Drawer = createDrawerNavigator<typeof recruiterProfileDrawerRootStack>();

const RecruiterProfileDrawer = () => {
  const theme = useTheme();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          // header: () => (
          //   <AppHeaderWithSettingsLink title='Perfil'></AppHeaderWithSettingsLink>
          // ),
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleAlign: 'center',
          drawerContentStyle: { backgroundColor: theme.colors.background },
          drawerStyle: { backgroundColor: theme.colors.background },
          drawerPosition: 'right',
        }}
        drawerContent={(props) => (
          <AppDrawerContent {...props}></AppDrawerContent>
        )}
        initialRouteName={'RECRUITER_PROFILE_STACK'}
      >
        <Drawer.Screen
          name='EDIT_PROFILE'
          options={{ title: 'Editar Perfil' }}
          component={RecruiterProfileStack}
        ></Drawer.Screen>
        <Drawer.Screen
          name='RECRUITER_PROFILE_STACK'
          options={{ title: 'Perfil' }}
          component={RecruiterProfileStack}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default RecruiterProfileDrawer;
