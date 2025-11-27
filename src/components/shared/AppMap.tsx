import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import MapView, {
  MapStyleElement,
  MapViewProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
interface AppMapProps {
  //   handlePress?: () => void;
  //   handleDoublePress?: () => void;
  mapStyles?: StyleProp<ViewStyle>;
  mapProps?: MapViewProps;
}
const AppMap = (props: AppMapProps) => {
  return (
    <MapView
      {...props?.mapProps}
      provider={PROVIDER_GOOGLE}
      style={{ ...localStyles.mapView, ...StyleSheet.flatten(props.mapStyles) }}
    ></MapView>
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
