import { View, Text } from 'react-native';
import React, { Children, PropsWithChildren, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawerContent from '@components/shared/AppDrawerContent';
import useOpenElement from 'src/hooks/useOpenElement';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { IconButton } from 'react-native-paper';
import PasswordUpdateScreen from './PasswordUpdateScreen';
import AppModal from '@ui/AppModal';
import ConfirmSignOut from '@components/private/recruiter/ConfirmSignOut';
import RecruiterProfileStack from '../recruiter/RecruiterProfileStack';
import EditProfileScreen from './EditProfileScreen';
import { TypedNavigator } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

type DrawerNavigatorPropsShape = {
  PROFILE_STACK: {};
  EDIT_PROFILE: {};
  SIGN_OUT: {};
  UPDATE_PASSWORD: {};
};
interface AppProfileDrawerProps {
  drawerNavigatorProps: DrawerNavigatorPropsShape;
  backgroundColor: string;
  children?: (Drawer: any) => React.ReactNode;
  initialRouteName?: keyof DrawerNavigatorPropsShape;
}
const AppProfileDrawer = (props: AppProfileDrawerProps) => {
  const Drawer = createDrawerNavigator<typeof props.drawerNavigatorProps>();
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Drawer.Navigator
        defaultStatus='closed'
        initialRouteName={props.initialRouteName ?? 'EDIT_PROFILE'}
        screenOptions={{
          drawerStyle: {
            padding: 0,
            backgroundColor: props.backgroundColor,
            borderBottomLeftRadius: 0,
          },

          headerStyle: { backgroundColor: props.backgroundColor },
          headerTitleAlign: 'center',
          drawerContentStyle: {
            backgroundColor: props.backgroundColor,
          },

          drawerPosition: 'right',
        }}
        drawerContent={(props) => (
          <AppDrawerContent
            handleElementVisibility={handleElementVisibility}
            {...props}
          ></AppDrawerContent>
        )}
      >
        {props.children && props.children(Drawer)}
        <Drawer.Screen
          name='EDIT_PROFILE'
          options={({ navigation }) => {
            return {
              title: 'Editar Perfil',
              headerLeft() {
                return (
                  <IconButton
                    onPress={() => navigation.navigate('PROFILE_STACK', {})}
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
                    onPress={() => navigation.navigate('EDIT_PROFILE', {})}
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

export default AppProfileDrawer;
