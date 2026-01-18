import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import JobOffersList from 'src/screens/private/recruiter/JobOffersList';
import JobsListTabNavigator, {
  JobsListTabNavigatorRootParams,
} from '../JobsListTabNavigator';
import { useRoute } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';

export const JOBS_LIST_ROUTES = {
  JOB_POSTING_DETAIL: 'JOB_POSTING_DETAIL',
  JOB_POSTING_LIST: 'JOB_POSTING_LIST',
} as const;
export type JobListNavigatorRootParams = {
  [JOBS_LIST_ROUTES.JOB_POSTING_DETAIL]: {
    jobPosting: IJobPostingDB;
  };
  [JOBS_LIST_ROUTES.JOB_POSTING_LIST]: {
    jobPostingStatus: jobPostingStatus;
  };
};
const Stack = createNativeStackNavigator<JobListNavigatorRootParams>();
interface JobsListTabNavigatorProps
  extends DrawerScreenProps<JobsListTabNavigatorRootParams> {}
const JobsListNavigator = (props: JobsListTabNavigatorProps) => {
  // const route = useRoute();

  return (
    <Stack.Navigator
      initialRouteName={JOBS_LIST_ROUTES.JOB_POSTING_LIST}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={JOBS_LIST_ROUTES.JOB_POSTING_LIST}
        component={JobOffersList}
        initialParams={{
          jobPostingStatus: props.route.params.jobStatus,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default JobsListNavigator;
