import { View, StyleSheet, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { Card, IconButton, Modal, Text, useTheme } from 'react-native-paper';
import useModal from 'src/hooks/useModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import useOpenElement from 'src/hooks/useModal';
import AppPictureSelector from './AppPictureSelector';

interface AppAvatarCardProps {
  fullName: string;
  avatarPic: string;
}
type RBSheetType = {
  /**
   * The method to open bottom sheet.
   */
  open: () => void;

  /**
   * The method to close bottom sheet.
   */
  close: () => void;
};

const AppAvatarCard = ({ fullName, avatarPic }: AppAvatarCardProps) => {
  const theme = useTheme();
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const refRBSheet = useRef<RBSheetType>({} as RBSheetType);

  return (
    <>
      <Card style={localStyles.headerCard}>
        <Card.Content style={localStyles.headerContent}>
          <View style={localStyles.avatarContainer}>
            <Image
              source={require('../../../assets/profileAvatar.png')}
              style={localStyles.avatar}
            >
              {/* <Text style={localStyles.avatarText}>R</Text> */}
            </Image>

            <IconButton
              onPress={() => {
                if (refRBSheet.current) {
                  refRBSheet.current.open();
                }
              }}
              icon='pencil'
              size={20}
              style={{
                ...localStyles.editButton,
                backgroundColor: theme.colors.onPrimary,
              }}
              iconColor={theme.colors.primary}
            />
          </View>
          <View style={localStyles.headerTextContainer}>
            <Text variant='titleMedium'>¡Hola, {fullName}!</Text>
            <Text variant='bodyMedium' style={{ fontWeight: 'light' }}>
              Nos alegra que volvieras.
            </Text>
          </View>
        </Card.Content>
      </Card>
      <RBSheet
        draggable={true}
        customStyles={{
          container: {
            width: '94%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            paddingBottom: 10,
          },
        }}
        ref={refRBSheet}
      >
        <AppPictureSelector></AppPictureSelector>
      </RBSheet>
    </>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,

    borderRadius: 24,
    elevation: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '500',
  },
  editButton: {
    position: 'absolute',
    top: -8,
    right: -8,

    margin: 0,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',

    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
  },
});

export default AppAvatarCard;
