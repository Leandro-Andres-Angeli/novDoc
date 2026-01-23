import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Button } from 'react-native-paper';
import AppCameraPictureSelector from './AppCameraPictureSelector';

interface AppPictureSelectorProps extends PropsWithChildren {
  handleElementVisibility: (val?: boolean | undefined) => void;
  handleCameraPictureSelection: () => Promise<void>;
}
const AppPictureSelector = ({
  handleCameraPictureSelection,
  handleElementVisibility,
  children,
}: AppPictureSelectorProps) => {
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
        <AppCameraPictureSelector
          {...{ handleCameraPictureSelection }}
          handleElementVisibility={handleElementVisibility}
          style={localStyles.optionButton}
          contentStyle={localStyles.optionButtonContent}
          labelStyle={localStyles.optionButtonLabel}
        ></AppCameraPictureSelector>
        {children}
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
});

export default AppPictureSelector;
