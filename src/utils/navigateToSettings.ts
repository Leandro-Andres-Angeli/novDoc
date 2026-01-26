import { Alert, Linking, Platform } from 'react-native';

const navigateToSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  }
  if (Platform.OS === 'android') {
    Linking.openSettings();
  }
};
export default navigateToSettings;

export const navigateToSettingsAlert = (alertText: string) =>
  Alert.alert(alertText, '', [
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
