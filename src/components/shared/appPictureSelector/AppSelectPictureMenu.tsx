import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBSheetType from 'RBSheetType';
import AppPictureSelector from './AppPictureSelector';
import { Button } from 'react-native-paper';
import AppConfirmModal from '@components/private/recruiter/AppConfirmModal';
import { Linking } from 'react-native';
import useOpenElement from 'src/hooks/useOpenElement';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AppModal from '@ui/AppModal';
const deviceHeight = Dimensions.get('window').height;
interface AppSelectorPictureMenuProps {
  refRBSheet: React.RefObject<RBSheetType>;
  handleCancel: () => void;
  handleTakePictureFromCamera: () => Promise<void>;
  handleCameraPictureSelection: () => Promise<void>;
}
const AppSelectPictureMenu = ({
  refRBSheet,
  handleCancel,
  handleTakePictureFromCamera,
  handleCameraPictureSelection,
}: AppSelectorPictureMenuProps) => {
  const { elementVisible, handleElementVisibility } = useOpenElement();

  /* const photoResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        mediaTypes: ['images'],
        cameraType: ImagePicker.CameraType.front,
      }); */
  /*   const handleTakePictureFromCamera = async () => {
    try {
      const photoResult = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        quality: 1,
        mediaTypes: ['images'],
        cameraType: ImagePicker.CameraType.front,
      });
    
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
  }; */
  /*   const handleCancel = () => {
    if (refRBSheet) {
      refRBSheet.current.close();
    }
    handleElementVisibility(false);
  }; */
  /*   const handleCameraPictureSelection = async () => {
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
  }; */
  return (
    <>
      {/* <Text>PHOTO{JSON.stringify(photo?.uri)}</Text> */}
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
              onPress={handleCancel}
              style={[localStyles.optionButton, { backgroundColor: 'white' }]}
              contentStyle={localStyles.optionButtonContent}
              labelStyle={localStyles.optionButtonLabel}
              icon='close'
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
          handleCancel={handleCancel}
          //   handleCancel={() => {
          //     refRBSheet.current.close();
          //     handleElementVisibility(false);
          //   }}
        ></AppConfirmModal>
      </AppModal>
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

export default AppSelectPictureMenu;
