import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const AppPictureSelector = () => {
  return (
    <View style={localStyles.modalContainer}>
      {/* Handle Bar */}

      {/* Upload Options */}
      <View style={localStyles.optionsContainer}>
        <Button
          mode='text'
          //   onPress={handleUploadFromGallery}
          style={localStyles.optionButton}
          contentStyle={localStyles.optionButtonContent}
          labelStyle={localStyles.optionButtonLabel}
          icon='image-outline'
        >
          Upload from Gallery
        </Button>

        <Button
          mode='text'
          //   onPress={handleTakePhoto}
          style={localStyles.optionButton}
          contentStyle={localStyles.optionButtonContent}
          labelStyle={localStyles.optionButtonLabel}
          icon='camera-outline'
        >
          Take Photo with Camera
        </Button>

        <Button
          mode='contained'
          //   onPress={hideModal}
          style={localStyles.cancelButton}
          buttonColor='#E5E5E5'
          textColor='#333'
        >
          Cancel
        </Button>
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
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 8,
  },
  optionButtonContent: {
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  optionButtonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    flex: 1,
    textAlign: 'left',
  },
  cancelButton: {
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
    paddingVertical: 8,
  },
});

export default AppPictureSelector;
