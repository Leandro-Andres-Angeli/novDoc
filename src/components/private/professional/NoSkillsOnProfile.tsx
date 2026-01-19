import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  Button,
  Text,
  Surface,
  useTheme,
  IconButton,
  Icon,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomTheme } from 'src/providers/PublicProviders';
const iconPosition = (top = 20, left = 10, opacity = 0.8): ViewStyle => ({
  top,
  left,
  opacity,
});
export default function NoSkillsOnProfile() {
  const theme = useTheme<CustomTheme>();

  return (
    <LinearGradient
      colors={[
        theme.colors.primaryDynamicOpacity(0.05),
        theme.colors.primaryDynamicOpacity(0.03),
      ]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Rocket Icon Circle */}
        <View style={styles.iconContainer}>
          <Surface style={styles.iconSurface} elevation={4}>
            <Text style={styles.rocketIcon}>🚀</Text>
          </Surface>
          {/* Decorative elements */}
          <View
            style={[
              styles.decorativeCircle,
              styles.iconCircle,
              { backgroundColor: theme.colors.primary },
              { ...iconPosition() },
              {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9,
              },
            ]}
          >
            <Icon
              theme={theme}
              size={24}
              source={'code-tags'}
              color={theme.colors.onPrimary}
            ></Icon>
          </View>

          <View
            style={[
              styles.decorativeCircle,
              styles.iconCircle,
              { backgroundColor: theme.colors.primary },
              { ...iconPosition(110, 110) },
              {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9,
              },
            ]}
          >
            <Icon
              theme={theme}
              size={24}
              source={'database'}
              color={theme.colors.onPrimary}
            ></Icon>
          </View>
        </View>

        {/* Main Title */}
        <Text variant='headlineSmall' style={styles.mainTitle}>
          ¡Tu próximo gran paso{'\n'}empieza aquí!
        </Text>

        {/* Description */}
        <Text variant='bodyMedium' style={styles.description}>
          Para mostrarte las mejores coincidencias y conectar con oportunidades
          que realmente te apasionen, necesitamos conocer tu perfil técnico.
        </Text>

        {/* Feature List */}
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <IconButton
              icon='check-circle'
              iconColor={theme.colors.primary}
              size={20}
              style={styles.checkIcon}
            />
            <Text variant='bodySmall' style={styles.featureText}>
              Personaliza tu búsqueda por tecnología
            </Text>
          </View>

          <View style={styles.featureItem}>
            <IconButton
              icon='check-circle'
              iconColor={theme.colors.primary}
              size={20}
              style={styles.checkIcon}
            />
            <Text variant='bodySmall' style={styles.featureText}>
              Aumenta tu visibilidad ante reclutadores
            </Text>
          </View>
        </View>
        <View>
          {/* CTA Button */}
          <Button
            mode='contained'
            onPress={() => console.log('Complete skills pressed')}
            style={styles.ctaButton}
            contentStyle={styles.ctaButtonContent}
            labelStyle={styles.ctaButtonLabel}
          >
            Completar Habilidades →
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create<{
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}>({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  iconContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  iconSurface: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  rocketIcon: {
    fontSize: 50,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  blueCircle: {
    backgroundColor: '#5C6BC0',
  },
  mainTitle: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 28,
  },
  description: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  featureList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    margin: 0,
    marginRight: 8,
  },
  featureText: {
    flex: 1,
    color: '#555555',
    fontSize: 13,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 12,
  },
  ctaButtonContent: {
    paddingVertical: 8,
  },
  ctaButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 12,
  },
  skipButtonLabel: {
    color: '#999999',
    fontSize: 14,
  },
});
