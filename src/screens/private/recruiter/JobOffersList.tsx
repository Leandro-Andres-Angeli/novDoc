import { View, Pressable, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';

import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';

import ProfileProfileJobPostingEmptyState from '@components/private/recruiter/ProfileJobPostingEmptyState';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobListNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/jobsListNavigator/JobsListNavigator';
import { JOBS_LIST_ROUTES } from '../../../navigators/privateNavigator/recruiterNavigator/jobsListNavigator/JobsListNavigator';
import useGetJobPostings from 'src/hooks/useGetJobPostings';
import AppLoading from '@ui/AppLoading';
import { Text } from 'react-native-paper';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { isEmptyArray } from 'formik';

interface jobPostingsListProps
  extends NativeStackScreenProps<
    JobListNavigatorRootParams,
    'JOB_POSTING_LIST'
  > {}
const JobPostingsList = ({ route }: jobPostingsListProps) => {
  const { params } = route;

  const { jobPostingStatus } = params;

  const { loadJobPostings, loading, jobPostings, errors, hasMore, lastDocRef } =
    useContext(RecruiterContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const navigation = useNavigation<
    NavigationProp<{
      ['JOB_POSTING_DETAILS']: {
        jobPosting: IJobPostingDB;
      };
    }>
  >();
  const jobPostingStatusLoading = loading[jobPostingStatus];
  const jobPostingsByStatus = jobPostings.filter(
    (el) => el.status === jobPostingStatus
  );
  const error = errors[jobPostingStatus];
  //  const [first, setfirst] = useState(second)
  useEffect(() => {
    if (jobPostingsByStatus.length === 0 && !jobPostingStatusLoading) {
      console.log('LOADINGGGGG');
      loadJobPostings(jobPostingStatus);
    }
  }, [user, jobPostingStatus]);

  // if (jobPostingStatusLoading) {
  //   return <AppLoading></AppLoading>;
  // }

  if (error.error) {
    return (
      <View style={{ ...utilityStyles.flex }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (
    isEmptyArray(jobPostings.filter((el) => el.status === jobPostingStatus)) &&
    !jobPostingStatusLoading
  ) {
    return (
      <ProfileProfileJobPostingEmptyState
        {...{ jobPostingStatus }}
      ></ProfileProfileJobPostingEmptyState>
    );
  }
  const handleEndReached = () => {
    if (jobPostingStatusLoading) return;
    if (!hasMore[jobPostingStatus]) return;
    console.log('in end reached');
    loadJobPostings(jobPostingStatus);
  };
  return (
    <>
      <View style={[utilityStyles.container, utilityStyles.flex]}>
        <GenericList<IJobPostingDB>
          // ListHeaderComponent={
          //   (jobPostingStatusLoading && <AppLoading></AppLoading>) || null
          // }
          ListFooterComponent={
            (hasMore[jobPostingStatus] && <AppLoading></AppLoading>) || null
          }
          onEndReachedThreshold={0.9}
          onEndReached={() => handleEndReached()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                // navigate to detail
                navigation.navigate('JOB_POSTING_DETAILS', {
                  jobPosting: item,
                });
              }}
              // key={item.id}
              key={item.id}
            >
              <JobPostingCard jobPosting={item}></JobPostingCard>
            </Pressable>
          )}
          data={
            (jobPostings &&
              jobPostings.filter((el) => el.status === jobPostingStatus)) ||
            []
          }
        ></GenericList>
      </View>
    </>
  );
};

export default JobPostingsList;
