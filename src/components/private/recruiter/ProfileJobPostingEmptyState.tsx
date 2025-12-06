import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Briefcase } from 'lucide-react-native';
import { CustomTheme } from 'App';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from '../../../navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';

export default function ProfileProfileJobPostingEmptyState() {
  const theme = useTheme<CustomTheme>();
  const navigator =
    useNavigation<NavigationProp<RecruiterNavigatorRootParams>>();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.colors.primaryDynamicOpacity(0.2),
            borderRadius: 50,
          },
        ]}
      >
        <Briefcase size={32} color={theme.colors.primary} strokeWidth={2} />
      </View>

      <Text variant='titleLarge' style={styles.title}>
        No publicaste ofertas de trabajo todavía
      </Text>

      <Text variant='bodyMedium' style={styles.description}>
        Aún no creaste ninguna oferta de empleo. Empeza por publicar la primera.
      </Text>

      <Button
        mode='contained'
        onPress={() =>
          navigator.navigate(RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS, {})
        }
        style={styles.primaryButton}
        contentStyle={styles.buttonContent}
        icon='plus'
      >
        Crea tu primera oferta de trabajo
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 8,
  },
  secondaryButton: {
    width: '100%',
    borderRadius: 8,
    borderColor: '#ddd',
  },
  buttonContent: {
    height: 48,
  },
});
