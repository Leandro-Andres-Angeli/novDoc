import { View, Text } from 'react-native';
import React from 'react';
import {
  sharedProfileDrawerRootStack,
  sharedProfileDrawerRoute,
} from '../shared/SHARED_DRAWER_ROUTES';
import AppProfileDrawer from '../shared/AppProfileDrawer';
import { useTheme } from 'react-native-paper';
// const RECRUITER_PROFILE_DRAWER_ROUTES  : sharedProfileDrawerRoute   = {...sharedProfileDrawerRootStack}
export const professionalProfileDrawerRootStack: Record<
  sharedProfileDrawerRoute,
  any
> = {
  PROFILE_STACK: {},
  EDIT_PROFILE: {},
  SIGN_OUT: {},
  UPDATE_PASSWORD: {},
};
const ProfessionalProfileDrawer = () => {
  const theme = useTheme();
  return (
    <AppProfileDrawer
      backgroundColor={theme.colors.background}
      drawerNavigatorProps={professionalProfileDrawerRootStack}
    ></AppProfileDrawer>
  );
};

export default ProfessionalProfileDrawer;
