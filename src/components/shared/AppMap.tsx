import { useRef, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import MapView, {
  LatLng,
  MapPressEvent,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import * as Location from 'expo-location';
import { Toast } from 'toastify-react-native';
import useGetLocationFromCoords from 'src/hooks/useGetLocationFromCoords';
import { MapLocation } from 'src/types/dbTypes/IJobOffer';

interface AppMapProps {
  handleSelectMarker?: (...args: Array<MapLocation>) => void;
  //   handleDoublePress?: () => void;
  mapStyles?: StyleProp<ViewStyle>;
  mapProps?: MapViewProps;
}
const AppMap = (props: AppMapProps) => {
  const [markerVisible, setMarkerVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState<LatLng>({} as LatLng);
  const mapRef = useRef<MapView>(null);
  const { getLocationFromCoords } = useGetLocationFromCoords();
  const localHandlePress = async (e: MapPressEvent) => {
    try {
      e.persist();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.info(
          'Debe autorizar uso de geolocalización para usar esta funcionalidad'
        );
        return;
      }

      const {
        nativeEvent: { coordinate },
      } = e;
      setMarkerVisible(true);
      setMarkerCoords(coordinate);
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.0922, // This determines the initial zoom
              longitudeDelta: 0.0421,
            },
            1000
          );
        }
      }, 0);
      const locationFromCoords = await getLocationFromCoords(
        coordinate.latitude,
        coordinate.longitude
      );
      if (!locationFromCoords) {
        throw Error('Error getting reversed geo');
      }
      const { city, province } = locationFromCoords;

      if (props.handleSelectMarker) {
        props.handleSelectMarker(city, province);
      }
    } catch (error) {
      console.log('err', error);
      const parsedError = error as unknown as Error;
      Toast.error(parsedError.message ?? 'Error in geo');
    }
  };
  return (
    <>
      <MapView
        ref={mapRef}
        onPress={(e) => localHandlePress(e)}
        {...props?.mapProps}
        provider={PROVIDER_GOOGLE}
        style={{
          ...localStyles.mapView,
          ...StyleSheet.flatten(props.mapStyles),
        }}
      >
        {markerVisible && <Marker coordinate={markerCoords}></Marker>}
      </MapView>
    </>
  );
};
const localStyles = StyleSheet.create({
  mapView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default AppMap;
