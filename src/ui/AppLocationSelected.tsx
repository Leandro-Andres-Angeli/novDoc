import { View, Text } from 'react-native';
import React, { PropsWithChildren } from 'react';
import AppLoading from './AppLoading';

interface AppLocationSelectedProps extends PropsWithChildren {
  loadingCondition: boolean;
}
const AppLocationSelected = ({
  loadingCondition,
  children,
}: AppLocationSelectedProps) => {
  if (loadingCondition) {
    return <AppLoading></AppLoading>;
  } else {
    return children;
  }
};

export default AppLocationSelected;
