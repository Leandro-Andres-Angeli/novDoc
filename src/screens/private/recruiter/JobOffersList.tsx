import { View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';

import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';
import { isEmptyArray } from 'formik';

import ProfileProfileJobPostingEmptyState from '@components/private/recruiter/ProfileJobPostingEmptyState';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobListNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/jobsListNavigator/JobsListNavigator';
import { JOBS_LIST_ROUTES } from '../../../navigators/privateNavigator/recruiterNavigator/jobsListNavigator/JobsListNavigator';
import useGetJobPostings from 'src/hooks/useGetJobPostings';
import AppLoading from '@ui/AppLoading';
import { Text } from 'react-native-paper';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

interface jobPostingsListProps
  extends NativeStackScreenProps<
    JobListNavigatorRootParams,
    'JOB_POSTING_LIST'
  > {}
const JobPostingsList = ({ route }: jobPostingsListProps) => {
  const { params } = route;
  console.log('paramssss', params);
  const { jobPostingStatus } = params;
  const { error, jobPostings, loading } = useGetJobPostings(jobPostingStatus);
  // console.log('parent', navigation.getParent());
  // const parent = navigation.getParent();
  // console.log('stateeee', parent?.getState());
  const navigation = useNavigation<
    NavigationProp<{
      ['JOB_POSTING_DETAILS']: {
        jobPosting: IJobPostingDB;
      };
    }>
  >();
  if (loading) {
    return <AppLoading></AppLoading>;
  }

  if (error.error) {
    return (
      <View style={{ ...utilityStyles.flex }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isEmptyArray(jobPostings)) {
    return (
      <ProfileProfileJobPostingEmptyState
        {...{ jobPostingStatus }}
      ></ProfileProfileJobPostingEmptyState>
    );
  }

  return (
    <>
      <View style={[utilityStyles.container, utilityStyles.flex]}>
        <GenericList<IJobPostingDB>
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                // navigate to detail
                navigation.navigate('JOB_POSTING_DETAILS', {
                  jobPosting: item,
                });
              }}
              key={item.id}
            >
              <JobPostingCard jobPosting={item}></JobPostingCard>
            </Pressable>
          )}
          data={jobPostings}
        ></GenericList>
      </View>
    </>
  );
};

export default JobPostingsList;
