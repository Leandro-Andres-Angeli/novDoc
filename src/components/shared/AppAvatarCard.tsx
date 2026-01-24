import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper';

import RBSheet from 'react-native-raw-bottom-sheet';

import utilityStyles from 'src/styles/utilityStyles';

import AppCardWrapper from '@ui/AppCardWrapper';
import RBSheetType from 'RBSheetType';
import AppAvatar from '../../ui/AppAvatar';
import { CustomTheme } from 'src/providers/PublicProviders';
import AppPictureSelector from './appPictureSelector/AppPictureSelector';
import useOpenElement from 'src/hooks/useOpenElement';
import AppModal from '@ui/AppModal';
import AppConfirmModal from '@components/private/recruiter/AppConfirmModal';
// import {
//   CameraCapturedPicture,
//   CameraType,
//   CameraView,
//   useCameraPermissions,
// } from 'expo-camera';
import { Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const deviceHeight = Dimensions.get('window').height;
interface AppAvatarCardProps {
  fullName: string;
  avatarPic: string;
  style?: StyleProp<ViewStyle>;
}

const AppAvatarCard = ({ fullName, avatarPic, style }: AppAvatarCardProps) => {
  const theme = useTheme<CustomTheme>();
  // const { elementVisible, handleElementVisibility } = useOpenElement();
  const refRBSheet = useRef<RBSheetType>({} as RBSheetType);
  const { elementVisible, handleElementVisibility } = useOpenElement();
  //  const [permission, requestPermission] = useCameraPermissions();
  // const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>();
  // const ref = useRef<CameraView>(null);
  const handleTakePictureFromCamera = async () => {
    try {
      const photoResult = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        mediaTypes: ['images'],
        cameraType: ImagePicker.CameraType.front,
      });
      /* const photoResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        mediaTypes: ['images'],
        cameraType: ImagePicker.CameraType.front,
      }); */
      if (photoResult.canceled) {
        return;
      }
      const {
        assets: [photo],
      } = photoResult;
      setPhoto({ ...photo, assetId: uuidv4() });
    } catch (error) {
      console.log('ERROR TAKING PICTURE', error);
    } finally {
      refRBSheet.current.close();
    }
  };

  const handleCameraPictureSelection = async () => {
    console.log('requesting camera access');
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permission);

    if (!permission) {
      console.log('NOT PERMISSION');
    }
    if (!permission?.granted && permission?.canAskAgain) {
      permission = await ImagePicker.requestCameraPermissionsAsync();
    }
    if (!permission?.canAskAgain) {
      console.log("can't ask again");
      refRBSheet.current.close();
      setTimeout(() => {
        handleElementVisibility(true);
      }, 1000);

      return;
    }
    if (permission?.granted) {
      console.log('jereeeee');
      await handleTakePictureFromCamera();
    }
  };
  return (
    <ScrollView>
      {/* <Text>PHOTO{JSON.stringify(photo)}</Text> */}
      <Text>PHOTO{JSON.stringify(photo)}</Text>
      {/* <CameraView
        style={{ width: 200, height: 300 }}
        ref={ref}
        mode={'picture'}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      /> */}
      <AppCardWrapper styles={{ ...StyleSheet.flatten(style) }}>
        <Card.Content
          style={[
            localStyles.headerContent,

            {
              borderRadius: utilityStyles.btnBorderRadius.borderRadius,
              backgroundColor: theme.colors.onPrimary,
            },
          ]}
        >
          <AppAvatar>
            <IconButton
              onPress={() => {
                if (refRBSheet.current) {
                  refRBSheet.current.open();
                }
              }}
              icon='pencil'
              size={theme.fonts.iconFontSize}
              style={{
                ...localStyles.editButton,
                backgroundColor: theme.colors.onPrimary,
              }}
              iconColor={theme.colors.primary}
            />
          </AppAvatar>

          <View style={localStyles.headerTextContainer}>
            <Text variant='titleMedium'>¡Hola, {fullName}!</Text>
            <Text variant='bodyMedium' style={{ fontWeight: 'light' }}>
              Nos alegra que volvieras.
            </Text>
          </View>
        </Card.Content>
      </AppCardWrapper>

      <RBSheet
        draggable={true}
        customStyles={{
          container: {
            width: '94%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
          },
          wrapper: {
            display: 'flex',
          },
          draggableIcon: {
            top: -5,
            height: 5,
          },
        }}
        ref={refRBSheet}
      >
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: 5,
            zIndex: -2,
          }}
        >
          <AppPictureSelector
            {...{ handleElementVisibility, handleCameraPictureSelection }}
          >
            <Button
              mode='contained'
              //   onPress={hideModal}

              style={{ ...utilityStyles.muteButton, ...utilityStyles.btn }}
              textColor={utilityStyles.muteButtonColor.color}
            >
              Cancelar
            </Button>
          </AppPictureSelector>
        </View>
      </RBSheet>
      <AppModal
        style={{
          height: deviceHeight,

          top: 0,
          left: 0,
        }}
        visible={elementVisible}
        elementVisible={elementVisible}
      >
        <AppConfirmModal
          text2='Debe conceder acceso a cámara para realizar esta acción'
          text1='Se requiere permiso de cámara'
          handleConfirm={Linking.openSettings}
          handleCancel={() => {
            refRBSheet.current.close();
            handleElementVisibility(false);
          }}
        ></AppConfirmModal>
      </AppModal>
    </ScrollView>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,

    borderRadius: 24,
    elevation: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
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
  avatarText: {
    fontSize: 32,
    fontWeight: '500',
  },
  editButton: {
    position: 'absolute',
    top: -8,
    right: -8,

    margin: 0,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',

    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
  },
});

export default AppAvatarCard;
