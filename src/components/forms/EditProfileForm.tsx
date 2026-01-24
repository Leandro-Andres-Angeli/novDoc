import React, { useRef, useState } from 'react';

import { Role } from 'src/types/authContextTypes/userRole';

import {
  UpdateProfessionalProfileFormShape,
  UpdateRecruiterProfileFormShape,
} from 'src/types/FormProps';

import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import EditProfileProfessionalForm from './EditProfileProfessionalForm';
import EditProfileRecruiterForm from './EditProfileRecruiterForm';
import { updateProfile } from '../../services/profile/profile.service';
import AppAvatar from '@ui/AppAvatar';
import { IconButton, Text, useTheme } from 'react-native-paper';
import RBSheetType from 'RBSheetType';
import { CustomTheme } from 'src/providers/PublicProviders';
import AppSelectPictureMenu from '../shared/appPictureSelector/AppSelectPictureMenu';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useOpenElement from 'src/hooks/useOpenElement';
const EditProfileForm = ({
  user,
  loading,
  handleSubmit,
}: {
  user: UserTypes;
  loading: boolean;
  handleSubmit: (
    values:
      | UpdateRecruiterProfileFormShape
      | UpdateProfessionalProfileFormShape,
  ) => Promise<void>;
}) => {
  if (!user) {
    return <></>;
  }
  const theme = useTheme<CustomTheme>();
  const refRBSheet = useRef<RBSheetType>({} as RBSheetType);
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const handleCancel = () => {
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
    setPhoto(null);
    // handleElementVisibility(false);
  };
  const updateProfilePic = (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
      }}
    >
      <Text>{JSON.stringify(photo?.uri)}</Text>
      <AppAvatar
        avatarUrl={user.avatarUrl ?? photo?.uri ?? null}
        styles={{ position: 'relative' }}
        size={80}
      >
        <IconButton
          onPress={handleCancel}
          icon='backup-restore'
          size={theme.fonts.iconFontSize - 5}
          style={{
            position: 'absolute',
            bottom: -20,
            left: -8,

            backgroundColor: theme.colors.primary,
          }}
          iconColor={theme.colors.onPrimary}
        />
        <IconButton
          onPress={() => {
            if (refRBSheet.current) {
              refRBSheet.current.open();
            }
          }}
          icon='pencil'
          size={theme.fonts.iconFontSize - 5}
          style={{
            position: 'absolute',
            bottom: -20,
            right: -8,

            backgroundColor: theme.colors.primary,
          }}
          iconColor={theme.colors.onPrimary}
        />
      </AppAvatar>
    </View>
  );

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
      if (refRBSheet) {
        refRBSheet.current.close();
      }
    }
  };

  const handleCameraPictureSelection = async () => {
    try {
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
    } catch (error) {
      console.log('error requesting permissions');
    }
  };

  switch (user.role) {
    case Role.PROFESSIONAL:
      return (
        <>
          <EditProfileProfessionalForm {...{ user, handleSubmit, loading }}>
            {updateProfilePic}
          </EditProfileProfessionalForm>
          <AppSelectPictureMenu
            {...{
              refRBSheet,
              handleCancel,
              handleCameraPictureSelection,
              handleTakePictureFromCamera,
            }}
          ></AppSelectPictureMenu>
        </>
      );
    case Role.RECRUITER:
      return (
        <>
          <EditProfileRecruiterForm {...{ user, handleSubmit, loading }}>
            {updateProfilePic}
          </EditProfileRecruiterForm>
          <AppSelectPictureMenu
            {...{
              refRBSheet,
              handleCancel,
              handleCameraPictureSelection,
              handleTakePictureFromCamera,
            }}
          ></AppSelectPictureMenu>
        </>
      );
  }
};

export default EditProfileForm;
