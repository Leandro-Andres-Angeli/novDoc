import { View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { RecruiterContext } from 'src/appContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';
import { isEmptyArray } from 'formik';

import ProfileProfileJobPostingEmptyState from '@components/private/recruiter/ProfileJobPostingEmptyState';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AuthContext } from 'src/appContext/AuthContext';

import {
  RecruiterProfileStackRootParams,
  RecruiterProfileStackRoutes,
} from './RecruiterProfileStack';

const JobOffersList = () => {
  const { jobOffers } = useContext(RecruiterContext);

  const navigation =
    useNavigation<NavigationProp<RecruiterProfileStackRootParams>>();

  if (isEmptyArray(jobOffers)) {
    return (
      <ProfileProfileJobPostingEmptyState></ProfileProfileJobPostingEmptyState>
    );
  }
  return (
    <>
      <View style={[utilityStyles.container, utilityStyles.flex]}>
        <GenericList<IJobPostingDB>
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log('pressed');
                // navigate to detail
                navigation.navigate(
                  RecruiterProfileStackRoutes.JOB_POSTING_DETAILS,
                  {
                    jobPosting: item,
                  }
                );
              }}
              key={item.id}
            >
              <JobPostingCard jobPosting={item}></JobPostingCard>
            </Pressable>
          )}
          data={jobOffers}
        ></GenericList>
      </View>
    </>
  );
};

export default JobOffersList;
