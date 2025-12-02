import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Card, IconButton, Text } from 'react-native-paper';
import AppTitle from '@ui/AppTitle';
import styled from 'styled-components/native';
interface AppAvatarCardProps {
  fullName: string;
  avatarPic: string;
}
const AppAvatarCard = ({ fullName, avatarPic }: AppAvatarCardProps) => {
  return (
    <Card style={localStyles.headerCard}>
      <Card.Content style={localStyles.headerContent}>
        <View style={localStyles.avatarContainer}>
          <View style={localStyles.avatar}>
            <Text style={localStyles.avatarText}>R</Text>
          </View>

          <IconButton
            icon='pencil'
            size={20}
            style={localStyles.editButton}
            iconColor='#000'
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
