import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { Chip, Text, Button, useTheme, Modal } from 'react-native-paper';

import { getLocales } from 'expo-localization';

import currencyFormatter from '@utils/currencyFormatter';
import dateFormatter from '@utils/dateFormatter ';

import utilityStyles from 'src/styles/utilityStyles';
import useOpenElement from 'src/hooks/useOpenElement';

import AppModal from '@ui/AppModal';
import ConfirmCloseJobPosting from '../private/recruiter/ConfirmCloseJobPosting';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecruiterProfileStackRootParams } from 'src/screens/private/recruiter/RecruiterProfileStack';
import { Toast } from 'toastify-react-native';
import { CustomTheme } from 'src/providers/PublicProviders';

import jobPostingHasLocation from '@utils/jobPostingHasLocation';
import { updatejobPosting } from 'src/services/jobOffer/jobOffer.service';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import { Timestamp } from 'firebase/firestore';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';

interface JobDetailProp {
  jobPosting: IJobPostingDB;
}

const JobDetail = ({ jobPosting }: JobDetailProp) => {
  const [locale] = getLocales();
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const { updateLocalJob } = useContext(RecruiterContext);
  const navigator =
    useNavigation<NativeStackNavigationProp<RecruiterProfileStackRootParams>>();
  const theme = useTheme<CustomTheme>();
  const confirmCloseJobPosting = async () => {
    try {
      const updatejobPostingResult = await updatejobPosting(jobPosting.id, {
        status: jobPostingStatus.CLOSED,
        updatedAt: Timestamp.fromDate(new Date()),
      });

      if (updatejobPostingResult.success) {
        updateLocalJob({
          ...updatejobPostingResult.data,
          id: updatejobPostingResult.data.id,
        });
      }
      handleElementVisibility(false);
      if (!updatejobPostingResult.success) {
        throw Error(updatejobPostingResult.message);
      }

      Toast.show({
        autoHide: true,

        text1: updatejobPostingResult.message,
        type: 'success',
        onHide: () => navigator.navigate('RECRUITER_PROFILE_TABS', {}),
      });
    } catch (error) {
      const parsedError = error as Error;
      Toast.show({
        autoHide: true,
        text1: parsedError.message ?? 'error',
        type: 'error',
      });
      console.log('err', error);
    }
  };
  return (
    <>
      <View
        style={{
          ...styles.container,
          ...utilityStyles.contentContainer,
          marginVertical: 16,
        }}
      >
        <ScrollView style={styles.content}>
          {/* Job Title Section */}
          <View style={styles.section}>
            <Text variant='headlineSmall' style={styles.jobTitle}>
              {jobPosting.title}
            </Text>
            <Text variant='bodyMedium' style={styles.company}>
              {jobPosting.company}
            </Text>
          </View>

          {/* Job Info Cards */}
          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text variant='bodySmall' style={styles.infoLabel}>
                Salario
              </Text>
              <Text variant='titleMedium' style={styles.infoValue}>
                {currencyFormatter(locale).format(jobPosting.salary)}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text variant='bodySmall' style={styles.infoLabel}>
                Tipo de Empleo
              </Text>
              <Text variant='titleMedium' style={styles.infoValue}>
                {jobPosting.shiftTime}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, styles.fullWidthCard]}>
            <Text variant='bodySmall' style={styles.infoLabel}>
              Modalidad
            </Text>
            <Text variant='titleMedium' style={styles.infoValue}>
              {jobPosting.jobLocation}
            </Text>
          </View>
          {jobPostingHasLocation(jobPosting) && (
            <View style={[styles.infoCard, styles.fullWidthCard]}>
              <Text variant='titleMedium' style={styles.infoValue}>
                {jobPosting.province.nombre}
              </Text>
              <Text variant='bodySmall' style={styles.infoLabel}>
                {jobPosting.city.nombre}
              </Text>
            </View>
          )}
          <View style={[styles.infoCard, styles.fullWidthCard]}>
            <Text variant='bodySmall' style={styles.infoLabel}>
              Seniority
            </Text>
            <Text variant='titleMedium' style={styles.infoValue}>
              {jobPosting.seniority}
            </Text>
          </View>

          <View style={[styles.infoCard, styles.fullWidthCard]}>
            <Text variant='bodySmall' style={styles.infoLabel}>
              Fecha de publicacion
            </Text>
            <Text variant='titleMedium' style={styles.infoValue}>
              {dateFormatter(locale).format(jobPosting.updatedAt.toDate())}
            </Text>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text variant='titleMedium' style={styles.sectionTitle}>
              Descripción del Puesto
            </Text>
            <Text variant='bodyMedium' style={styles.description}>
              {jobPosting.description}
            </Text>
          </View>

          {/* Requirements Section */}
          <View style={styles.section}>
            <Text variant='titleMedium' style={styles.sectionTitle}>
              Requisitos
            </Text>
            <View style={styles.chipsContainer}>
              {jobPosting.skills.map((req, index) => (
                <Chip
                  key={index}
                  mode='flat'
                  style={{
                    backgroundColor: theme.colors.primaryDynamicOpacity(0.08),
                  }}
                  textStyle={{
                    ...styles.chipText,
                    color: theme.colors.primary,
                  }}
                >
                  {req.name}
                </Chip>
              ))}
            </View>
          </View>

          {/* Close Button */}
          <View style={styles.btnContainer}>
            {jobPosting.status !== jobPostingStatus.CLOSED && (
              <Button
                mode='contained'
                onPress={() => console.log('Close offer')}
                // style={styles.closeButton}
                buttonColor='#FFE5E5'
                textColor='#C62828'
                icon={'close'}
                contentStyle={{ ...utilityStyles.btn }}
                onPressIn={() => handleElementVisibility()}
              >
                Cerrar Oferta
              </Button>
            )}
            <Button
              mode='contained'
              onPress={() =>
                navigator.navigate('EDIT_JOB_POSTING', { jobPosting })
              }
              style={utilityStyles.btn}
              buttonColor={theme.colors.primary}
              icon={'pen'}
            >
              Editar Oferta
            </Button>
          </View>
        </ScrollView>
      </View>

      <AppModal
        onDismiss={() => handleElementVisibility(false)}
        dismissable={true}
        style={{ display: 'flex' }}
        visible={elementVisible}
        {...{ elementVisible }}
      >
        <ConfirmCloseJobPosting
          handleConfirm={confirmCloseJobPosting}
          handleCancel={() => handleElementVisibility(false)}
        ></ConfirmCloseJobPosting>
      </AppModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  jobTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  company: {
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 8,
    // paddingHorizontal: 16,
    marginBottom: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  fullWidthCard: {
    // marginHorizontal: 16,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  description: {
    color: '#424242',
    lineHeight: 22,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: '#424242',
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    color: '#424242',
    lineHeight: 22,
  },
  btnContainer: { gap: 8, marginVertical: 10 },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    fontSize: 13,
  },
  candidatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  candidateCard: {
    flexDirection: 'row',
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  candidateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  candidateName: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 11,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: '#F5F5F5',
    height: 26,
  },
  skillChipText: {
    fontSize: 11,
    color: '#666',
  },
  divider: {
    marginVertical: 4,
  },
  closeButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 8,
  },
  closeButtonContent: {
    height: 48,
  },
});

export default JobDetail;
