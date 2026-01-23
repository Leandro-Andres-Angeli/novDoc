import React, { useState } from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Toast } from 'toastify-react-native';
import AppModal from '@ui/AppModal';
import AppConfirmModal from '@components/private/recruiter/AppConfirmModal';
import useOpenElement from 'src/hooks/useOpenElement';

interface AppCameraPictureSelectorProps extends Omit<ButtonProps, 'children'> {
  handleElementVisibility: (val?: boolean | undefined) => void;
  handleCameraPictureSelection: () => Promise<void>;
}

const AppCameraPictureSelector = (props: AppCameraPictureSelectorProps) => {
  return (
    <>
      <Button
        mode='text'
        //   onPress={handleTakePhoto}
        {...props}
        icon='camera-outline'
        onPress={props.handleCameraPictureSelection}
      >
        Tomar foto con cámara
      </Button>
    </>
  );
};

export default AppCameraPictureSelector;
