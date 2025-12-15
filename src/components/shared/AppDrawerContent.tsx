import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Button, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import AppAvatar from '../../ui/AppAvatar';
const AppDrawerUserProfile = () => {
  const theme = useTheme();
  const localStyles = StyleSheet.create({
    container: { backgroundColor: theme.colors.primary },
  });
  return (
    <View style={{ ...localStyles.container }}>
      <AppAvatar></AppAvatar>
    </View>
  );
};
interface AppDrawerContentProps extends DrawerContentComponentProps {
  handleElementVisibility: (val?: boolean) => void;
}

const AppDrawerContent = (props: AppDrawerContentProps) => {
  const theme = useTheme();

  return (
    <>
      <DrawerContentScrollView
        style={{
          padding: 0,
          backgroundColor: 'green',
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',
          backgroundColor: 'yellow',
          height: '100%',
          width: '100%',
          position: 'absolute',
          padding: 0,
          margin: 0,
        }}
      >
        <AppDrawerUserProfile></AppDrawerUserProfile>
        <View style={{ backgroundColor: 'red' }}>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginTop: 'auto',
            marginBottom: 1,
            backgroundColor: 'red',
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
