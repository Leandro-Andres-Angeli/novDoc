import { View, Image } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface AppAvatarProps extends PropsWithChildren {
  avatarUrl?: string | null;
}
const AppAvatar = (props: AppAvatarProps) => {
  const [avatarProfilePic, setAvatarProfilePic] = useState(
    props.avatarUrl ?? '../../assets/profileAvatar.png',
  );
  const fallbackImg = '../../assets/profileAvatar.png';
  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
  return (
    <View>
      {/* <Text>{JSON.stringify(props.avatarUrl)} </Text> */}
      {/* {props.avatarUrl && (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: props.avatarUrl }}
          resizeMode='cover'
        ></Image>
      )} */}

      <Avatar.Image
        // source={require('../../assets/profileAvatar.png')}
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
        size={80}
      ></Avatar.Image>

      {props.children}
    </View>
  );
};

export default AppAvatar;
