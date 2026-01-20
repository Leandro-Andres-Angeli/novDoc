import React, { useContext } from 'react';

import { useTheme } from 'react-native-paper';

import { AuthContext } from 'src/appContext/authContext/AuthContext';
import useOpenElement from 'src/hooks/useOpenElement';

import { useNavigation } from '@react-navigation/native';
import AppProfileDrawer from '../shared/AppProfileDrawer';

import RecruiterProfileStack from './RecruiterProfileStack';
import * as Drawer from '@react-navigation/drawer';
import { Screen } from 'react-native-screens';

const RECRUITER_PROFILE_DRAWER_ROUTES = {
  PROFILE_STACK: 'PROFILE_STACK',
  SIGN_OUT: 'SIGN_OUT',
  EDIT_PROFILE: 'EDIT_PROFILE',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
} as const;
export type recruiterProfileDrawerRoute =
  keyof typeof RECRUITER_PROFILE_DRAWER_ROUTES;
export const recruiterProfileDrawerRootStack: Record<
  recruiterProfileDrawerRoute,
  any
> = {
  PROFILE_STACK: {},
  EDIT_PROFILE: {},
  SIGN_OUT: {},
  UPDATE_PASSWORD: {},
};
// const Drawer = createDrawerNavigator<typeof recruiterProfileDrawerRootStack>();

const RecruiterProfileDrawer = () => {
  const theme = useTheme();

  return (
    <AppProfileDrawer
      backgroundColor={theme.colors.background}
      drawerNavigatorProps={recruiterProfileDrawerRootStack}
      initialRouteName='PROFILE_STACK'
    >
      {(Drawer) => {
        return (
          <>
            <Drawer.Screen
              name='PROFILE_STACK'
              options={{ title: 'Perfil' }}
              component={RecruiterProfileStack}
            ></Drawer.Screen>
          </>
        );
      }}
    </AppProfileDrawer>
  );
};

export default RecruiterProfileDrawer;
