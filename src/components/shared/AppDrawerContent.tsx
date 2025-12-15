import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Button, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import useOpenElement from 'src/hooks/useOpenElement';
import AppModal from '@ui/AppModal';
import ConfirmSignOut from '../private/recruiter/ConfirmSignOut';
import { signOut } from 'firebase/auth';
import { AuthContext } from 'src/appContext/AuthContext';
interface AppDrawerContentProps extends DrawerContentComponentProps {
  handleElementVisibility: (val?: boolean) => void;
}
const AppDrawerContent = (props: AppDrawerContentProps) => {
  const theme = useTheme();

  return (
    <>
      <DrawerContentScrollView
        style={{
          display: 'flex',
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',

          height: '100%',
        }}
      >
        <View>
          <Text>Here goes profile card</Text>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginTop: 'auto',
            marginBottom: 1,
          }}
        >
          <Button
            style={{
              ...utilityStyles.btnBorderRadius,
              ...utilityStyles.btn,
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              backgroundColor: theme.colors.secondary,
            }}
            textColor={theme.colors.onSecondary}
            rippleColor={'transparent'}
            onPress={() => {
              props.handleElementVisibility(true);
            }}
            icon={'logout'}
          >
            Cerrar sesión
          </Button>
        </View>
      </DrawerContentScrollView>
    </>
  );
};

export default AppDrawerContent;
