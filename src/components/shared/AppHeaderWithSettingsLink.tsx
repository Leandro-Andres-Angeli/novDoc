import { View } from 'react-native';
import React from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppHeader from '@ui/AppHeader';
import { IconButton, Text } from 'react-native-paper';

const AppHeaderWithSettingsLink = ({
  title = 'Postulaciones',
}: {
  title: string;
}) => {
  return (
    <View
      style={{
        ...utilityStyles.row,

        width: '100%',
      }}
    >
      <AppHeader
        logo={false}
        styles={{
          justifyContent: 'center',
          marginLeft: '34%',
          marginRight: 'auto',
        }}
      >
        <Text variant='titleMedium'>{title}</Text>
      </AppHeader>
      <View
        style={{
          ...utilityStyles.row,
          position: 'relative',
          right: 0,
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <IconButton icon={'cog-outline'}></IconButton>
        <IconButton icon={'bell-outline'}></IconButton>
      </View>
    </View>
  );
};

export default AppHeaderWithSettingsLink;
