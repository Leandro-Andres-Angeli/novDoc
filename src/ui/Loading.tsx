import {
  ActivityIndicator,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface LoadingProps {
  styles?: StyleProp<ViewStyle>;
  activityIndicatorStyles?: StyleProp<ViewStyle>;
  activityIndicatorSize?: number;
}

const Loading = (props: LoadingProps) => {
  return (
    <View
      style={{ ...loadingBaseStyles.view, ...StyleSheet.flatten(props.styles) }}
    >
      <ActivityIndicator
        size={props.activityIndicatorSize ?? 30}
        style={StyleSheet.flatten(props.activityIndicatorStyles)}
      ></ActivityIndicator>
    </View>
  );
};
const loadingBaseStyles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
