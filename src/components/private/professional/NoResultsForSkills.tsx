import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Button,
  Text,
  Surface,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomTheme } from 'src/providers/PublicProviders';
import { LinearGradient } from 'expo-linear-gradient';
import utilityStyles from 'src/styles/utilityStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const NoResultsForSkills = () => {
  const theme = useTheme<CustomTheme>();
  const navigation =
    useNavigation<NativeStackNavigationProp<{ PROFILE: {} }>>();
  return (
    <LinearGradient
      colors={[
        theme.colors.primaryDynamicOpacity(0.05),
        theme.colors.primaryDynamicOpacity(0.03),
      ]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Container */}
        <Surface
          style={{
            ...styles.iconContainer,
            ...{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#FFFFFF',

              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
            },
          }}
          elevation={4}
        >
          <MaterialCommunityIcons
            name='briefcase-off-outline'
            size={56}
            color={theme.colors.primary}
          />
        </Surface>

        {/* Main Heading */}
        <Text variant='headlineSmall' style={utilityStyles.mainTitle}>
          No hay nuevas ofertas por ahora
        </Text>

        {/* Description */}
        <Text variant='bodyMedium' style={utilityStyles.descriptionText}>
          Parece que hemos recorrido todo el catálogo. No te preocupes, nuevas
          oportunidades aparecen cada hora!
        </Text>

        {/* What can I do section */}
        <Text variant='titleSmall' style={styles.sectionTitle}>
          ¿Qué puedes hacer?
        </Text>

        {/* Action Items */}
        <View style={styles.actionContainer}>
          {/* Action 1 */}
          <View style={styles.actionItem}>
            <View style={styles.bulletContainer}>
              <IconButton
                icon='check-circle'
                iconColor={theme.colors.primary}
                size={20}
                //   style={styles.checkIcon}
              />
            </View>
            <View style={styles.actionTextContainer}>
              <Text variant='bodyMedium' style={styles.actionTitle}>
                Ampliar tus habilidades
              </Text>
              <Text variant='bodySmall' style={styles.actionSubtext}>
                Para recibir más ofertas
              </Text>
            </View>
          </View>

          {/* Action 2 */}
          <View style={styles.actionItem}>
            <View style={styles.bulletContainer}>
              <IconButton
                icon='check-circle'
                iconColor={theme.colors.primary}
                size={20}
                //   style={styles.checkIcon}
              />
            </View>
            <View style={styles.actionTextContainer}>
              <Text variant='bodyMedium' style={styles.actionTitle}>
                Ajustar preferencias
              </Text>
              <Text variant='bodySmall' style={styles.actionSubtext}>
                Ciudad, rango salarial o decisión.
              </Text>
            </View>
          </View>
        </View>

        {/* Update Profile Button */}
        <Button
          mode='contained'
          icon='pencil-outline'
          onPress={() => navigation.navigate('PROFILE', {})}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Actualizar Perfil
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: 'center',
    color: '#6B6B6B',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#1A1A1A',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  actionContainer: {
    width: '100%',
    marginBottom: 32,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bulletContainer: {
    marginTop: 4,
    marginRight: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionSubtext: {
    color: '#6B6B6B',
    lineHeight: 18,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default NoResultsForSkills;
