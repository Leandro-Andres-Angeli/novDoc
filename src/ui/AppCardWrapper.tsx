import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Card } from 'react-native-paper';
interface AppCardWrapperProps extends PropsWithChildren {
  styles?: StyleProp<ViewStyle>;
}
const AppCardWrapper = (props: AppCardWrapperProps) => {
  return (
    <Card
      style={{ ...localStyles.headerCard, ...StyleSheet.flatten(props.styles) }}
    >
      {props.children}
    </Card>
  );
};
const localStyles = StyleSheet.create({
  headerCard: {
    margin: 16,

    borderRadius: 24,
    elevation: 0,
  },
});
export default AppCardWrapper;
