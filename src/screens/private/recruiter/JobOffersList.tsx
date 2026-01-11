import {
  View,
  Pressable,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';
import GenericList from '@components/genericList/GenericList';

import utilityStyles from 'src/styles/utilityStyles';
import JobPostingCard from '@components/jobPostingCard/JobPostingCard';

import ProfileProfileJobPostingEmptyState from '@components/private/recruiter/ProfileJobPostingEmptyState';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobListNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/jobsListNavigator/JobsListNavigator';

import AppLoading from '@ui/AppLoading';
import { Text } from 'react-native-paper';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showLoadedData = () => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      delay: 500,
    });
  };

  useEffect(() => {
    if (jobPostingsByStatus.length === 0 && !jobPostingStatusLoading) {
      console.log('LOADINGGGGG');

      loadJobPostings(jobPostingStatus);
    }
  }, [user, jobPostingStatus]);
  useEffect(() => {
    if (!jobPostingStatusLoading) {
      console.log('HEREEEEE ANIM');
      return showLoadedData().start();
    }
  }, []);

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

    loadJobPostings(jobPostingStatus);
  };

  if (jobPostingStatusLoading) {
    return <AppLoading></AppLoading>;
  }

  return (
    <>
      <Text>Here</Text>
      <Text>{JSON.stringify(fadeAnim)}</Text>
      <Animated.View
        style={{ opacity: fadeAnim, backgroundColor: 'red', flex: 1 }}
      >
        <View style={[utilityStyles.container, utilityStyles.flex]}>
          <GenericList<IJobPostingDB>
            ListFooterComponent={
              (hasMore[jobPostingStatus] && <AppLoading></AppLoading>) || null
            }
            onEndReachedThreshold={0.9}
            onEndReached={() => handleEndReached()}
            // onRefresh={() => (
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => onRefresh()}
            //   ></RefreshControl>
            // )}
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
      </Animated.View>
    </>
  );
};

export default JobPostingsList;
