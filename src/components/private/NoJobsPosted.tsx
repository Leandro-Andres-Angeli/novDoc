import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from '../../navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';

const NoJobsPosted = () => {
  const navigator =
    useNavigation<NavigationProp<RecruiterNavigatorRootParams>>();
  return (
    <View style={styles.container}>
      {/* Empty State */}
      <View style={styles.emptyState}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-9tt_YkHy_PZZkc1hYFSNGI1_q44v6LGT4UpNdMCAocL0gOuBfoYNPC9nYGGI5oLYo6VQFm7w4te6CFXz5AMjTOaQzkbU-tfVEksJCtpiPI5Bxv8phRHuyazIC9ISEBeoDF61UHW_bB3ek8CHvv1IQ4BkeWkfsyucFtvL3bH1ZJvAndgAjeeuPWg3pLlb7Y5B4ciVTg4R8ThkEDtsfrBo87FaO1X9MdyaBWhVSjzffmmz9pT7AO8Kz3tkkSnjkb60AJx4JwlDqGrA',
          }}
          style={styles.image}
          resizeMode='contain'
        />

        <Text variant='headlineMedium' style={styles.headline}>
          Tu Próxima Gran Contratación Te Espera
        </Text>
        <Text variant='bodyMedium' style={styles.description}>
          Publica tu primera oferta de trabajo para comenzar a explorar perfiles
          y conectar con desarrolladores talentosos que buscan su próximo
          desafío.
        </Text>

        <Button
          mode='contained'
          onPress={() =>
            navigator.navigate(RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS, {})
          }
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Crear Publicación de Trabajo
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    borderRadius: 12,
  },
  buttonLabel: {
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#137fec',
  },
});
export default NoJobsPosted;
