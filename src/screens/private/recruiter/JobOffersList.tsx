import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { RecruiterContext } from 'src/appContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';
import { IJobOffer, IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import { Divider } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';

const JobOffersList = () => {
  const { jobOffers } = useContext(RecruiterContext);

  return (
    <View style={[utilityStyles.container, utilityStyles.flex]}>
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
