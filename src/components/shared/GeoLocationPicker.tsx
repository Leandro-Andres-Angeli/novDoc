import { View, Text } from 'react-native';
import React from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { IconButton, useTheme } from 'react-native-paper';

const GeoLocationPicker = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        utilityStyles.inputsContainer,
        utilityStyles.flex,
        utilityStyles.row,
        utilityStyles.alignCenter,
      ]}
    >
      <Text>Usar mi ubicación</Text>
      <IconButton
        icon={'map-marker-outline'}
        mode='contained'
        iconColor={theme.colors.primary}
      ></IconButton>
    </View>
  );
};

export default GeoLocationPicker;
