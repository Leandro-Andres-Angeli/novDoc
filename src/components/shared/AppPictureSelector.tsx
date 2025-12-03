import { View, Text, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Button, Icon } from 'react-native-paper';
import AppButton from '../../ui/AppButton';
import AppButtonText from '../../ui/AppButtonText';
interface AppPictureSelectorProps extends PropsWithChildren {}
const AppPictureSelector = (props: AppPictureSelectorProps) => {
  return (
    <View style={localStyles.modalContainer}>
      <View style={localStyles.optionsContainer}>
        <Button
          mode='text'
          //   onPress={handleUploadFromGallery}
          style={localStyles.optionButton}
          contentStyle={localStyles.optionButtonContent}
          labelStyle={localStyles.optionButtonLabel}
          icon='image-outline'
        >
          Subir foto desde galería
        </Button>

        <Button
          mode='text'
          //   onPress={handleTakePhoto}
          style={localStyles.optionButton}
          contentStyle={localStyles.optionButtonContent}
          labelStyle={localStyles.optionButtonLabel}
          icon='camera-outline'
        >
          Tomar foto con cámara
        </Button>

        {props.children}
      </View>
    </View>
  );
};
const localStyles = StyleSheet.create({
  modalContainer: {
    paddingTop: 12,

    marginBottom: 30,
    paddingHorizontal: 20,
  },

  optionsContainer: {
    gap: 12,
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
  // cancelButton: {
  //   borderRadius: 12,
  //   marginTop: 12,
  //   marginBottom: 12,
  //   paddingVertical: 8,
  // },
});

export default AppPictureSelector;
