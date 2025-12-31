import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobPosting';

import jobPostingsList from 'src/screens/private/recruiter/jobPostingsList';
import JobsListTabNavigator, {
  JobsListTabNavigatorRootParams,
} from '../JobsListTabNavigator';
import { useRoute } from '@react-navigation/native';

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
    shouldUpdate: boolean;
  };
};
const Stack = createNativeStackNavigator<JobListNavigatorRootParams>();
interface JobsListTabNavigatorProps
  extends NativeStackScreenProps<JobsListTabNavigatorRootParams> {}
const JobsListNavigator = (props: JobsListTabNavigatorProps) => {
  const route = useRoute();
  console.log('route hoook', route.params);
  return (
    <Stack.Navigator
      initialRouteName={JOBS_LIST_ROUTES.JOB_POSTING_LIST}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={JOBS_LIST_ROUTES.JOB_POSTING_LIST}
        component={jobPostingsList}
        initialParams={{
          jobPostingStatus: props.route.params.jobStatus,
          shouldUpdate: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default JobsListNavigator;
