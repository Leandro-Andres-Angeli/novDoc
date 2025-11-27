import { useRef, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import MapView, {
  LatLng,
  MapPressEvent,
  MapStyleElement,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Text } from 'react-native-paper';
import * as Location from 'expo-location';

interface AppMapProps {
  handleSelectMarker?: (...args: Array<string>) => void;
  //   handleDoublePress?: () => void;
  mapStyles?: StyleProp<ViewStyle>;
  mapProps?: MapViewProps;
}
const AppMap = (props: AppMapProps) => {
  const [markerVisible, setMarkerVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState<LatLng>({} as LatLng);
  const mapRef = useRef<MapView>(null);

  const localHandlePress = async (e: MapPressEvent) => {
    setMarkerVisible(true);
    try {
      const {
        nativeEvent: { coordinate },
      } = e;
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

      const [coordinatesData] = await Location.reverseGeocodeAsync(coordinate);
      console.log('coords data', coordinatesData);
      const city = coordinatesData.district ?? coordinatesData.city ?? null;
      if (!city || !coordinatesData.region) {
        throw Error('Error getting reversed geo');
      }

      console.log('coords data', coordinatesData);
      if (props.handleSelectMarker) {
        props.handleSelectMarker(city, coordinatesData.region);
      }
    } catch (error) {
      console.log('err', error);
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
