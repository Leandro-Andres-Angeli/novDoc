import React, { useContext, useEffect, useRef, useState } from 'react';

import { Role } from 'src/types/authContextTypes/userRole';

import {
  UpdateProfessionalProfileFormShape,
  UpdateRecruiterProfileFormShape,
} from 'src/types/FormProps';

import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import EditProfileProfessionalForm from './EditProfileProfessionalForm';
import EditProfileRecruiterForm from './EditProfileRecruiterForm';

import AppAvatar from '@ui/AppAvatar';
import { IconButton, Text, useTheme } from 'react-native-paper';
import RBSheetType from 'RBSheetType';
import { CustomTheme } from 'src/providers/PublicProviders';
import AppSelectPictureMenu from '../shared/appPictureSelector/AppSelectPictureMenu';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'src/services/profile/profile.service';
import { Toast } from 'toastify-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfilePhotoContext } from 'src/appContext/photoContext/ProfilePhotoContext';
import { uploadFile } from 'src/services/shared/imageUpload/imageUpload.service';

type NavigatorWithProfileStackRoute = {
  PROFILE_STACK: {};
};
const EditProfileForm = ({ user }: { user: UserTypes }) => {
  if (!user) {
    return <></>;
  }
  const [loading, setLoading] = useState(false);
  const { photo, resetPhoto, handleSetPhoto } = useContext(ProfilePhotoContext);
  const handleSubmit = async (
    values:
      | UpdateRecruiterProfileFormShape
      | UpdateProfessionalProfileFormShape,
  ) => {
    setLoading(true);
    try {
      let avatarUrl = user.avatarUrl ?? '';
      if (photo) {
        try {
          const uploadPicture = await uploadFile(photo);
          if (!uploadPicture.success) {
            Toast.error(uploadPicture.message);
            return;
          }
          avatarUrl = uploadPicture.data.url;
        } catch (err) {
          Toast.error('Unknown error');
        }
      }
      const updatedProfileOp = await updateProfile(user.id, {
        ...values,
        avatarUrl,
      });
      if (updatedProfileOp.success) {
        Toast.show({
          onHide() {
            if (values.role === Role.RECRUITER) {
              navigation.navigate('PROFILE_STACK', {});
              return;
            }
            navigation.getParent()?.navigate('SWIPE', {});
          },
          text1: updatedProfileOp.message,
          visibilityTime: 700,
          autoHide: true,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme<CustomTheme>();
  const refRBSheet = useRef<RBSheetType>({} as RBSheetType);

  const handleCancel = () => {
    console.log('here here');
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }

    resetPhoto();
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
        avatarUrl={photo?.uri ?? user.avatarUrl ?? null}
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

      handleSetPhoto({ ...photo, assetId: uuidv4() });
    } catch (error) {
      console.log('ERROR TAKING PICTURE', error);
    } finally {
      if (refRBSheet) {
        refRBSheet.current.close();
      }
    }
  };
  const handleGetPictureFromGallery = async () => {
    try {
      const photoResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ['images'],
      });

      if (photoResult.canceled) {
        return;
      }
      const {
        assets: [photo],
      } = photoResult;

      handleSetPhoto({ ...photo, assetId: uuidv4() });
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
  const handleGalleryPictureSelection = async () => {
    try {
      console.log('requesting camera access');
      let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(permission);

      if (!permission) {
        console.log('NOT PERMISSION');
      }
      if (!permission?.granted && permission?.canAskAgain) {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
      if (!permission?.canAskAgain) {
        console.log("can't ask again");
        refRBSheet.current.close();

        return;
      }
      if (permission?.granted) {
        console.log('jereeeee');
        await handleGetPictureFromGallery();
      }
    } catch (error) {
      console.log('error requesting permissions');
    }
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorWithProfileStackRoute>>();

  useEffect(() => {
    const navigationSubscription = navigation.addListener('blur', function () {
      resetPhoto();
    });

    return navigationSubscription;
  }, []);

  switch (user.role) {
    case Role.PROFESSIONAL:
      return (
        <>
          <EditProfileProfessionalForm
            {...{ user, handleSubmit, loading, photo }}
          >
            {updateProfilePic}
          </EditProfileProfessionalForm>
          <AppSelectPictureMenu
            {...{
              refRBSheet,
              handleCancel,
              handleCameraPictureSelection,
              handleGalleryPictureSelection,
            }}
          ></AppSelectPictureMenu>
        </>
      );
    case Role.RECRUITER:
      return (
        <>
          <EditProfileRecruiterForm {...{ user, handleSubmit, loading, photo }}>
            {updateProfilePic}
          </EditProfileRecruiterForm>
          <AppSelectPictureMenu
            {...{
              refRBSheet,
              handleCancel,
              handleCameraPictureSelection,
              handleGalleryPictureSelection,
            }}
          ></AppSelectPictureMenu>
        </>
      );
  }
};

export default EditProfileForm;
