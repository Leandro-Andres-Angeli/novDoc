import { View, Text, Alert, Platform, Linking } from 'react-native';
import React, { useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { IconButton, useTheme } from 'react-native-paper';
import * as Location from 'expo-location';
import { Toast } from 'toastify-react-native';
import geoRefAxiosInstance, {
  geoRefAxiosInstanceEndpoints,
} from 'axios/geoRef';
import { GeoLocationReversed } from 'src/types/geoRefResponses/geoLocationReversed';
interface GeoLocationPickerProps {
  handleSelectProvince: (val: string) => void;
  handleSelectCity: (val: string) => void;
  handleLoading: (val: boolean) => void;
}
const GeoLocationPicker = ({
  handleSelectCity,
  handleSelectProvince,
  handleLoading,
}: GeoLocationPickerProps) => {
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
        handleLoading(true);
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.High,
          timeInterval: 500,
        });
        const [reversedGeo] = await Location.reverseGeocodeAsync(
          position.coords
        );
        console.log('location ', position);
        console.log('reversedGeo ', reversedGeo);
        const { country } = reversedGeo;
        if (country !== 'Argentina') {
          return Toast.error('Solo se pueden cargar locaciones de Argentina');
        }
        const { data }: { data: GeoLocationReversed } =
          await geoRefAxiosInstance.get(
            geoRefAxiosInstanceEndpoints.COORDS(
              position.coords.latitude.toString(),
              position.coords.longitude.toString()
            )
          );
        if (data.ubicacion.departamento.nombre) {
          handleSelectCity(data.ubicacion.departamento.nombre);
        }
        if (data.ubicacion.provincia.nombre) {
          handleSelectProvince(data.ubicacion.provincia.nombre);
        }
        // console.log('found data', JSON.stringify(data, null, 3));
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
