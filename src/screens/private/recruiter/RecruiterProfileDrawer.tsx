import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RecruiterProfileStack from './RecruiterProfileStack';

import { IconButton, useTheme } from 'react-native-paper';

import AppDrawerContent from '@components/shared/AppDrawerContent';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import useOpenElement from 'src/hooks/useOpenElement';
import AppModal from '@ui/AppModal';
import ConfirmSignOut from '@components/private/recruiter/ConfirmSignOut';

import EditProfileScreen from '../shared/EditProfileScreen';
import PasswordUpdateScreen from '../shared/PasswordUpdateScreen';
const RECRUITER_PROFILE_DRAWER_ROUTES = {
  RECRUITER_PROFILE_STACK: 'RECRUITER_PROFILE_STACK',
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
  RECRUITER_PROFILE_STACK: {},
  EDIT_PROFILE: {},
  SIGN_OUT: {},
  UPDATE_PASSWORD: {},
};
const Drawer = createDrawerNavigator<typeof recruiterProfileDrawerRootStack>();

const RecruiterProfileDrawer = () => {
  const theme = useTheme();
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          // header: () => (
          //   <AppHeaderWithSettingsLink title='Perfil'></AppHeaderWithSettingsLink>
          // ),
          // drawerItemStyle: {
          //   ...utilityStyles.btnBorderRadius,
          //   ...utilityStyles.btn,
          // },

          drawerStyle: { padding: 0, backgroundColor: theme.colors.background },
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleAlign: 'center',
          drawerContentStyle: {
            backgroundColor: theme.colors.background,
          },

          drawerPosition: 'right',
        }}
        drawerContent={(props) => (
          <AppDrawerContent
            handleElementVisibility={handleElementVisibility}
            {...props}
          ></AppDrawerContent>
        )}
        initialRouteName={'RECRUITER_PROFILE_STACK'}
      >
        <Drawer.Screen
          name='RECRUITER_PROFILE_STACK'
          options={{ title: 'Perfil' }}
          component={RecruiterProfileStack}
        ></Drawer.Screen>
        <Drawer.Screen
          name='EDIT_PROFILE'
          // options={{
          //   title: 'Editar Perfil',

          // }}
          options={({ navigation }) => {
            return {
              title: 'Editar Perfil',
              headerLeft() {
                return (
                  <IconButton
                    onPress={() =>
                      navigation.navigate('RECRUITER_PROFILE_STACK')
                    }
                    icon={'chevron-left'}
                  ></IconButton>
                );
              },
            };
          }}
          component={EditProfileScreen}
        ></Drawer.Screen>
        <Drawer.Screen
          name='UPDATE_PASSWORD'
          options={({ navigation }) => {
            return {
              title: 'Actualizar contraseña',
              headerLeft() {
                return (
                  <IconButton
                    onPress={() => navigation.navigate('EDIT_PROFILE')}
                    icon={'chevron-left'}
                  ></IconButton>
                );
              },
            };
          }}
          component={PasswordUpdateScreen}
        ></Drawer.Screen>
      </Drawer.Navigator>
      <AppModal visible={elementVisible} elementVisible={elementVisible}>
        <ConfirmSignOut
          handleConfirm={logout}
          handleCancel={() => handleElementVisibility(false)}
        ></ConfirmSignOut>
      </AppModal>
    </>
  );
};

export default RecruiterProfileDrawer;
