import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppButton from '@ui/AppButton';
import AppButtonText from '@ui/AppButtonText';
import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button, IconButton, useTheme } from 'react-native-paper';
import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import { Container, MainContent } from 'src/screens/public/SignInScreen';
import utilityStyles from 'src/styles/utilityStyles';

const NoCandidates = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NavigationProp<RecruiterNavigatorRootParams>>();
  return (
    <ScrollView style={{ ...utilityStyles.container, ...utilityStyles.flex }}>
      <View>
        <View>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU--cVGOTnClP60mYvMUigRa5OX2H3xErcfwZ1UDasf6WQrNsuQ5lzb_rGIuG_nQGVuTiy46tO_Q2ry5xO8364GRhcLSxtAEknYJq1pWzfF6Xw_9m8vPFhIQpQvCb87woWzZ8sv2l8iWrj3s0c88WjJMLb1cD0fPoCFZvRgS-D-cWjYdyacBPHnHmf7j4u1pn7R2pzrqa_kptUxS4CNHp_PsLOM9EfPg1eLMNM_um1u4Dtt--6Rrv87MSEg0BHuBTfUOtLk0BJDelD',
            }}
            style={localStyles.coverImage}
          />
        </View>

        <View
          style={{
            ...localStyles.section,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text variant='headlineSmall' style={localStyles.title}>
            Aún no hay candidatos
          </Text>
          <Text variant='bodyMedium' style={localStyles.description}>
            Las vacantes con ofertas laborales completas atraen en promedio un
            30% más de candidatos. Sigue estos pasos para atraer a los mejores
            talentos.
          </Text>
        </View>

        <Card style={localStyles.actionCard}>
          <Card.Content
            style={{
              ...localStyles.actionContent,
              ...utilityStyles.btnBorderRadius,
              backgroundColor: theme.colors.background,
            }}
          >
            <IconButton
              icon='file-document-outline'
              size={24}
              iconColor={theme.colors.primary}
              background={theme.colors.onBackground}
              style={localStyles.actionIcon}
            />
            <View
              style={{
                ...localStyles.actionText,
              }}
            >
              <Text variant='titleMedium' style={localStyles.actionTitle}>
                ¿Qué puedes hacer ahora?
              </Text>
              <Text variant='bodySmall' style={localStyles.actionDescription}>
                Revisa y mejora tu oferta. Asegúrate de que el salario, las
                responsabilidades y los beneficios sean claros.
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={localStyles.actionCard}>
          <Card.Content
            style={{
              ...localStyles.actionContent,
              ...utilityStyles.btnBorderRadius,
              backgroundColor: theme.colors.background,
            }}
          >
            <IconButton
              icon='share-variant'
              size={24}
              iconColor={theme.colors.primary}
              style={localStyles.actionIcon}
            />
            <View style={localStyles.actionText}>
              <Text variant='titleMedium' style={localStyles.actionTitle}>
                Comparte tu oferta
              </Text>
              <Text variant='bodySmall' style={localStyles.actionDescription}>
                Incrementa la visibilidad compartiéndola en tus redes sociales.
              </Text>
            </View>
          </Card.Content>
        </Card>
        <View style={{ ...utilityStyles.contentContainer }}>
          <AppButton
            onPress={() =>
              navigation.navigate(RECRUITER_NAVIGATOR_ROUTES.PROFILE, {})
            }
          >
            <AppButtonText>Volver a ofertas</AppButtonText>
          </AppButton>
        </View>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  imageCard: {
    margin: 16,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 2,
  },
  coverImage: {
    height: 270,
    resizeMode: 'cover',
    width: '75%',
    marginHorizontal: 'auto',

    borderRadius: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  description: {
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  actionCard: {
    marginHorizontal: 16,
    marginVertical: 12,

    borderRadius: 8,
    elevation: 1,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
  },
  actionIcon: {
    margin: 0,
    marginRight: 8,
  },
  actionText: {
    flex: 1,
    textAlign: 'center',
  },
  actionTitle: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  actionDescription: {
    color: '#666',
    lineHeight: 18,
  },
  viewButton: {
    display: 'flex',
    // marginHorizontal: 14,
    // marginVertical: 24,
  },
});

export default NoCandidates;
