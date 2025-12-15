import { View, Text, StyleSheet, Image } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { CustomTheme } from 'App';
interface AppAvatarProps extends PropsWithChildren {}
const AppAvatar = (props: AppAvatarProps) => {
  const theme = useTheme<CustomTheme>();
  return (
    <View style={[localStyles.avatarContainer]}>
      <Image
        source={require('../../assets/profileAvatar.png')}
        style={localStyles.avatar}
      ></Image>

      {props.children}
    </View>
  );
};
const localStyles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppAvatar;
