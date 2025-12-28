import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import AppCardWrapper from '@ui/AppCardWrapper';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

import jobOfferHasLocation from '@utils/jobOfferHasLocation';
import { CustomTheme } from 'src/providers/PublicProviders';
import dateFormatter from '@utils/dateFormatter ';
import { getLocales } from 'expo-localization';
interface JobPostingCardProps {
  jobPosting: IJobPostingDB;
}
const JobPostingCard = (props: JobPostingCardProps) => {
  const { jobPosting } = props;
  const theme = useTheme<CustomTheme>();
  const [locale] = getLocales();
  return (
    <AppCardWrapper
      styles={{
        marginBottom: 0,
        marginHorizontal: 0,
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primaryDynamicOpacity(0.2) },
              ]}
            >
              <Text
                variant='titleMedium'
                style={{
                  color: theme.colors.primary,
                }}
              >
                &lt;/&gt;
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text variant='titleMedium' style={styles.title}>
                {jobPosting.title}
              </Text>
              <Text
                variant='bodySmall'
                style={{ ...styles.subtitle, textTransform: 'capitalize' }}
              >
                {jobPosting.shiftTime} |{' '}
                {(jobOfferHasLocation(jobPosting) &&
                  jobPosting.province.nombre +
                    ' , ' +
                    jobPosting.city.nombre) ||
                  jobPosting.jobLocation}
              </Text>
              <Text
                variant='bodySmall'
                style={{ ...styles.subtitle, fontStyle: 'italic' }}
              >
                {dateFormatter(locale).format(jobPosting.updatedAt.toDate())}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.candidateInfo}>
          <View style={styles.dot} />
          <Text variant='bodySmall' style={styles.candidateText}>
            0
          </Text>
        </View>
        <Text> status {jobPosting.status}</Text>
      </Card.Content>
    </AppCardWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
  candidateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  candidateText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default JobPostingCard;
