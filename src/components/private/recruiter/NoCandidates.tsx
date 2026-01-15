import AppButton from '@ui/AppButton';
import AppButtonText from '@ui/AppButtonText';
import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button, IconButton, useTheme } from 'react-native-paper';
import { Container, MainContent } from 'src/screens/public/SignInScreen';

const NoCandidates = () => {
  const theme = useTheme();
  return (
    <Container>
      <MainContent>
        <Card>
          <Card.Cover
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU--cVGOTnClP60mYvMUigRa5OX2H3xErcfwZ1UDasf6WQrNsuQ5lzb_rGIuG_nQGVuTiy46tO_Q2ry5xO8364GRhcLSxtAEknYJq1pWzfF6Xw_9m8vPFhIQpQvCb87woWzZ8sv2l8iWrj3s0c88WjJMLb1cD0fPoCFZvRgS-D-cWjYdyacBPHnHmf7j4u1pn7R2pzrqa_kptUxS4CNHp_PsLOM9EfPg1eLMNM_um1u4Dtt--6Rrv87MSEg0BHuBTfUOtLk0BJDelD',
            }}
            style={localStyles.coverImage}
          />
        </Card>

        <View style={localStyles.section}>
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
          <Card.Content style={localStyles.actionContent}>
            <IconButton
              icon='file-document-outline'
              size={24}
              iconColor={theme.colors.primary}
              style={localStyles.actionIcon}
            />
            <View style={localStyles.actionText}>
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
          <Card.Content style={localStyles.actionContent}>
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
        <AppButton onPress={() => {}}>
          <AppButtonText>Volver a ver ofertas</AppButtonText>
        </AppButton>
        {/* <Button
          mode='outlined'
          onPress={() => {}}
          style={localStyles.viewButton}
          labelStyle={localStyles.viewButtonLabel}
        >
          
        </Button> */}
      </MainContent>
    </Container>
  );
};
/* const NoCandidates = () => {
  const theme = useTheme();
  return (
    <View style={localStyles.container}>
      <ScrollView style={localStyles.content}>
        <Card>
          <Card.Cover
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU--cVGOTnClP60mYvMUigRa5OX2H3xErcfwZ1UDasf6WQrNsuQ5lzb_rGIuG_nQGVuTiy46tO_Q2ry5xO8364GRhcLSxtAEknYJq1pWzfF6Xw_9m8vPFhIQpQvCb87woWzZ8sv2l8iWrj3s0c88WjJMLb1cD0fPoCFZvRgS-D-cWjYdyacBPHnHmf7j4u1pn7R2pzrqa_kptUxS4CNHp_PsLOM9EfPg1eLMNM_um1u4Dtt--6Rrv87MSEg0BHuBTfUOtLk0BJDelD',
            }}
            style={localStyles.coverImage}
          />
        </Card>

        <View style={localStyles.section}>
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
          <Card.Content style={localStyles.actionContent}>
            <IconButton
              icon='file-document-outline'
              size={24}
              iconColor={theme.colors.primary}
              style={localStyles.actionIcon}
            />
            <View style={localStyles.actionText}>
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
          <Card.Content style={localStyles.actionContent}>
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

        <Button
          mode='outlined'
          onPress={() => {}}
          style={localStyles.viewButton}
          labelStyle={localStyles.viewButtonLabel}
        >
          Volver a ver ofertas
        </Button>
      </ScrollView>
    </View>
  );
}; */

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    height: 200,
    borderRadius: 12,
  },
  section: {
    paddingHorizontal: 16,
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
  },
  actionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
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
    marginHorizontal: 16,
    marginVertical: 24,
    borderColor: '#6200ee',
  },
  viewButtonLabel: {
    color: '#6200ee',
  },
});

export default NoCandidates;
