import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Button, Text, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import AppAvatar from '../../ui/AppAvatar';
import { AuthContext } from 'src/appContext/authContext/AuthContext';

const AppDrawerUserProfile = () => {
  const theme = useTheme();
  const {
    authState: { user },
  } = useContext(AuthContext);
  const localStyles = StyleSheet.create({
    container: { backgroundColor: theme.colors.primary },
  });
  return (
    <View
      style={{
        ...localStyles.container,
        ...utilityStyles.alignCenter,
        paddingHorizontal: 30,
        paddingVertical: 40,
        marginBottom: 10,
      }}
    >
      <AppAvatar avatarUrl={user?.avatarUrl ?? null}></AppAvatar>
      <View style={{ marginTop: 5 }}>
        <Text
          variant='titleMedium'
          style={{
            color: theme.colors.onPrimary,
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
        >
          {user?.name}
        </Text>
        <Text variant='titleSmall' style={{ color: theme.colors.onPrimary }}>
          {user?.role}
        </Text>
      </View>
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
      <View
        style={{
          padding: 0,

          height: '100%',
          width: '100%',
        }}
      >
        <AppDrawerUserProfile></AppDrawerUserProfile>
        <View>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginTop: 'auto',
            marginBottom: 1,
            paddingBottom: 20,
            paddingHorizontal: 5,
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
      </View>
    </>
  );
};

export default AppDrawerContent;
