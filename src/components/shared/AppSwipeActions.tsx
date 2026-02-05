import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { IconButton, Surface, useTheme } from 'react-native-paper';
import { CustomTheme } from 'src/providers/PublicProviders';
import { ViewProps } from 'react-native';

const width = Dimensions.get('screen').width;
interface AppSwipeActionsProps extends ViewProps {
  handleMatch: () => void;
  handleReject: () => void;
  handleAddToFavorites: () => void;
}
const AppSwipeActions = ({
  handleMatch,
  handleReject,
  handleAddToFavorites,
  ...props
}: AppSwipeActionsProps) => {
  const theme = useTheme<CustomTheme>();
  return (
    <View
      {...props}
      style={{
        ...StyleSheet.flatten(props.style),
        ...localStyles.actionsContainer,
        maxWidth: width,
        marginTop: 'auto',
        marginBottom: 15,
      }}
    >
      <Surface
        style={[localStyles.actionButton, localStyles.rejectButton]}
        elevation={1}
      >
        <IconButton
          icon='close'
          iconColor='#FF4458'
          size={28}
          onPress={handleMatch}
        />
      </Surface>

      <Surface
        style={[localStyles.actionButton, localStyles.starButton]}
        elevation={1}
      >
        <IconButton
          icon='star'
          iconColor='#FFA726'
          size={28}
          onPress={handleAddToFavorites}
        />
      </Surface>

      <Surface
        style={[
          localStyles.actionButton,
          localStyles.likeButton,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        elevation={2}
      >
        <IconButton
          icon='heart'
          iconColor='#FFFFFF'
          size={32}
          onPress={handleReject}
        />
      </Surface>
    </View>
  );
};
const localStyles = StyleSheet.create({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
  },
  actionButton: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    width: 56,
    height: 56,
  },
  likeButton: {
    width: 64,
    height: 64,
  },
  starButton: {
    width: 56,
    height: 56,
  },
});
export default AppSwipeActions;
