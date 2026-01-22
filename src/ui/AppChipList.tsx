import { View, Text } from 'react-native';
import React, { PropsWithChildren } from 'react';
interface AppChipListProps extends PropsWithChildren {}
const AppChipList = (props: AppChipListProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      {props.children}
    </View>
  );
};

export default AppChipList;
