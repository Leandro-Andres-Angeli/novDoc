import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { IJobPostingDB, JobOfferStatus } from 'src/types/dbTypes/IJobOffer';

import JobOffersList from 'src/screens/private/recruiter/JobOffersList';
import JobsListTabNavigator, {
  JobsListTabNavigatorRootParams,
} from '../JobsListTabNavigator';

export const JOBS_LIST_ROUTES = {
  JOB_POSTING_DETAIL: 'JOB_POSTING_DETAIL',
  JOB_POSTING_LIST: 'JOB_POSTING_LIST',
} as const;
export type JobListNavigatorRootParams = {
  [JOBS_LIST_ROUTES.JOB_POSTING_DETAIL]: {
    jobPosting: IJobPostingDB;
  };
  [JOBS_LIST_ROUTES.JOB_POSTING_LIST]: {
    jobPostingStatus: JobOfferStatus;
    shouldUpdate?: boolean;
  };
};
const Stack = createNativeStackNavigator<JobListNavigatorRootParams>();
interface JobsListTabNavigatorProps
  extends NativeStackScreenProps<JobsListTabNavigatorRootParams> {}
const JobsListNavigator = (props: JobsListTabNavigatorProps) => {
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
