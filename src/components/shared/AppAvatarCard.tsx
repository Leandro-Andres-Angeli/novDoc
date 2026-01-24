import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React, { useContext, useRef, useState } from 'react';
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
import { AuthContext } from 'src/appContext/authContext/AuthContext';
const deviceHeight = Dimensions.get('window').height;
interface AppAvatarCardProps {
  fullName: string;
  avatarPic: string;
  style?: StyleProp<ViewStyle>;
}

const AppAvatarCard = ({ fullName, avatarPic, style }: AppAvatarCardProps) => {
  const theme = useTheme<CustomTheme>();
  const {
    authState: { user },
  } = useContext(AuthContext);
  // const { elementVisible, handleElementVisibility } = useOpenElement();
  const refRBSheet = useRef<RBSheetType>({} as RBSheetType);
  const { elementVisible, handleElementVisibility } = useOpenElement();
  //  const [permission, requestPermission] = useCameraPermissions();
  // const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    user?.avatarUrl ?? null,
  );

  // const handleResetPhoto = () => {
  //     user?.avatarUrl ?  setPhoto(  user.avatarUrl ) :  null
  // };
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

  return (
    <>
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
          <AppAvatar avatarUrl={user?.avatarUrl ?? null}></AppAvatar>

          <View style={localStyles.headerTextContainer}>
            <Text variant='titleMedium'>¡Hola, {fullName}!</Text>
            <Text variant='bodyMedium' style={{ fontWeight: 'light' }}>
              Nos alegra que volvieras.
            </Text>
          </View>
        </Card.Content>
      </AppCardWrapper>
    </>
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
  optionButton: {
    borderRadius: 12,
    marginBottom: 12,
  },
  optionButtonContent: {
    paddingVertical: 12,

    justifyContent: 'space-between',
  },
  optionButtonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    flex: 1,
    textAlign: 'left',
  },
});

export default AppAvatarCard;
