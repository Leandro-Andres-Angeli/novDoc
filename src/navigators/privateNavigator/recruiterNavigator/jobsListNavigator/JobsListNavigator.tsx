import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

import JobOffersList from 'src/screens/private/recruiter/JobOffersList';
import AppHeaderWithSettingsLink from '@components/shared/AppHeaderWithSettingsLink';

export const JOBS_LIST_ROUTES = {
  JOB_POSTING_DETAIL: 'JOB_POSTING_DETAIL',
  JOB_POSTING_LIST: 'JOB_POSTING_LIST',
};
export type JobListNavigatorRootParams = {
  [JOBS_LIST_ROUTES.JOB_POSTING_DETAIL]: {
    jobPosting: IJobPostingDB;
  };
  [JOBS_LIST_ROUTES.JOB_POSTING_LIST]: {};
};
const Stack = createNativeStackNavigator<JobListNavigatorRootParams>();
const JobsListNavigator = () => {
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
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default JobsListNavigator;
