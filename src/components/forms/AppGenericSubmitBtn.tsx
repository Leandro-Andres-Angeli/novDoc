import { View, Text } from 'react-native';
import React from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
interface AppGenericSubmitBtnProps {
  loadingPostIndicator: boolean | undefined;
  handleSubmit: () => Promise<void>;
  dirty: boolean;
  isValid: boolean;
  submitTextBtn: string;
}
const AppGenericSubmitBtn = ({
  loadingPostIndicator,
  handleSubmit,
  dirty,
  isValid,
  submitTextBtn,
}: AppGenericSubmitBtnProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        utilityStyles.fabContainer,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {!loadingPostIndicator && (
        <Button
          mode='contained'
          style={utilityStyles.fab}
          contentStyle={utilityStyles.fabContent}
          labelStyle={utilityStyles.fabLabel}
          onPress={() => handleSubmit()}
          disabled={(dirty && !isValid) || !dirty}
        >
          {submitTextBtn}
        </Button>
      )}
      {loadingPostIndicator && (
        <ActivityIndicator
          color={theme.colors.primary}
          size={'small'}
        ></ActivityIndicator>
      )}
    </View>
  );
};

export default AppGenericSubmitBtn;
