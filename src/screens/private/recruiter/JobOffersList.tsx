import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { RecruiterContext } from 'src/appContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';
import { isEmptyArray } from 'formik';

import { useTheme } from 'react-native-paper';
import { CustomTheme } from 'App';
import ProfileProfileJobPostingEmptyState from '@components/private/recruiter/ProfileJobPostingEmptyState';

const JobOffersList = () => {
  const { jobOffers } = useContext(RecruiterContext);

  if (isEmptyArray(jobOffers)) {
    return (
      <ProfileProfileJobPostingEmptyState></ProfileProfileJobPostingEmptyState>
    );
  }
  return (
    <View style={[utilityStyles.container, utilityStyles.flex, ,]}>
      <GenericList<IJobPostingDB>
        renderItem={({ item }) => (
          <JobPostingCard jobPosting={item}></JobPostingCard>
        )}
        data={jobOffers}
      ></GenericList>
    </View>
  );
};

export default JobOffersList;
