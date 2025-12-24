import { View, Text, Alert, Platform, Linking } from 'react-native';
import React, { useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { IconButton, useTheme } from 'react-native-paper';
import * as Location from 'expo-location';
import { Toast } from 'toastify-react-native';

import { MapLocation } from 'src/types/dbTypes/IJobOffer';
import useGetLocationFromCoords from 'src/hooks/useGetLocationFromCoords';
interface GeoLocationPickerProps {
  handleSelectProvince: (val: MapLocation) => void;
  handleSelectCity: (val: MapLocation) => void;
  handleLoading: (val: boolean) => void;
}
const GeoLocationPicker = ({
  handleSelectCity,
  handleSelectProvince,
  handleLoading,
}: GeoLocationPickerProps) => {
  const theme = useTheme();
  const { getLocationFromCoords } = useGetLocationFromCoords();
  const navigateToSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };
  const handleGetGeoLocation = async () => {
    try {
      const { canAskAgain, status, granted } =
        await Location.requestForegroundPermissionsAsync();

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
        handleLoading(true);
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.High,
          timeInterval: 500,
        });
        const [reversedGeo] = await Location.reverseGeocodeAsync(
          position.coords
        );

        const { country } = reversedGeo;
        if (country !== 'Argentina') {
          return Toast.error('Solo se pueden cargar locaciones de Argentina');
        }

        const locationFromCoords = await getLocationFromCoords(
          position.coords.latitude,
          position.coords.longitude
        );
        if (!locationFromCoords) {
          throw Error('Error getting reversed geo');
        }
        const { city, province } = locationFromCoords;

        handleSelectCity(city);

        handleSelectProvince(province);
      }
    } catch (error) {
      console.log('err', error);
    } finally {
      handleLoading(false);
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
