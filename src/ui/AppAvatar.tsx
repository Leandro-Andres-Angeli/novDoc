import {
  View,
  Image,
  ViewProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface AppAvatarProps extends PropsWithChildren {
  avatarUrl?: string | null;
  size?: number;
  styles?: StyleProp<ViewStyle>;
}
const AppAvatar = (props: AppAvatarProps) => {
  const [avatarProfilePic, setAvatarProfilePic] = useState(
    props.avatarUrl ?? '../../assets/profileAvatar.png',
  );
  const fallbackImg = '../../assets/profileAvatar.png';
  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
  return (
    <View style={{ ...StyleSheet.flatten(props.styles) }}>
      <Avatar.Image
        source={
          errorLoadingImage || !props.avatarUrl
            ? require('../../assets/profileAvatar.png')
            : {
                uri: props.avatarUrl,
              }
        }
        onError={function (err) {
          console.log('ERROR LOADING PIC ', err);
          setErrorLoadingImage(true);
        }}
        /*   source={
          
          require('../../assets/profileAvatar.png')} */

        style={{
          shadowColor: '#9191914f',

          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.6,
          shadowRadius: 5.46,
        }}
        size={props.size ?? 60}
      ></Avatar.Image>

      {props.children}
    </View>
  );
};

export default AppAvatar;
