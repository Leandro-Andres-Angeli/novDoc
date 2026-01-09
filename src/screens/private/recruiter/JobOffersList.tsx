import { View, Pressable, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
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
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import { AuthContext } from 'src/appContext/authContext/AuthContext';

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
  // const jobPostingsByStatus = jobPostings.filter(
  //   (el) => el.status === jobPostingStatus
  // );
  const error = errors[jobPostingStatus];
  //  const [first, setfirst] = useState(second)
  useEffect(() => {
    if (jobPostings.length === 0 && !jobPostingStatusLoading) {
      console.log('LOADINGGGGG');
      loadJobPostings(jobPostingStatus);
    }
  }, [user]);

  // return (
  //   <View>
  //     <Text>Refactoring getting data</Text>
  //   </View>
  // );

  if (jobPostingStatusLoading) {
    return <AppLoading></AppLoading>;
  }

  if (error.error) {
    return (
      <View style={{ ...utilityStyles.flex }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (
    isEmptyArray(jobPostings.filter((el) => el.status === jobPostingStatus))
  ) {
    return (
      <ProfileProfileJobPostingEmptyState
        {...{ jobPostingStatus }}
      ></ProfileProfileJobPostingEmptyState>
    );
  }
  const handleEndReached = () => {
    console.log('in end reached');
    loadJobPostings(jobPostingStatus, true);
  };
  return (
    <>
      {/* <ScrollView>
        <Text>{JSON.stringify(jobPostings, null, 2)}</Text>
      </ScrollView> */}
      <Text>Has more {JSON.stringify(hasMore[jobPostingStatus])}</Text>
      <Text>
        Has more ref{JSON.stringify(lastDocRef.current[jobPostingStatus])}
      </Text>
      <View style={[utilityStyles.container, utilityStyles.flex]}>
        <GenericList<IJobPostingDB>
          onEndReachedThreshold={0.7}
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
