import { View, Text, Alert, Platform, Linking } from 'react-native';
import React from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { IconButton, useTheme } from 'react-native-paper';
import * as Location from 'expo-location';

const GeoLocationPicker = () => {
  const theme = useTheme();
  const navigateToSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };
  const handleGetGeoLocation = async () => {
    console.log('HERE');
    try {
      const { canAskAgain, status, granted } =
        await Location.requestForegroundPermissionsAsync();
      console.log('permissions');
      console.log('permissions', status);
      console.log('granted', granted);
      if (!canAskAgain) {
        Alert.alert('Autorizar permisos de ubicación', '', [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: navigateToSettings,
            style: 'default',
          },
        ]);
        return;
        // await Location.requestForegroundPermissionsAsync();
      }
      if (status === 'granted') {
        console.log('here granted');
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.High,
          timeInterval: 500,
        });
        console.log('location ', position);
      }

      console.log(canAskAgain);
    } catch (error) {
      console.log('err', error);
    }
  };
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
        onPress={() => handleGetGeoLocation()}
        icon={'map-marker-outline'}
        mode='contained'
        iconColor={theme.colors.primary}
      ></IconButton>
    </View>
  );
};

export default GeoLocationPicker;
