import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { CustomTheme } from 'App';
interface AppAvatarProps extends PropsWithChildren {}
const AppAvatar = (props: AppAvatarProps) => {
  return (
    <View>
      <Avatar.Image
        source={require('../../assets/profileAvatar.png')}
        style={{
          shadowColor: '#9191914f',

          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.6,
          shadowRadius: 5.46,
        }}
      ></Avatar.Image>

      {props.children}
    </View>
  );
};

export default AppAvatar;
