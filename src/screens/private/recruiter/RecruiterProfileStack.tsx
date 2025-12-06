import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

import RecruiterProfileScreen from './RecruiterProfileScreen';
import JobDetail from '@components/shared/JobDetail';
export const RecruiterProfileStackRoutes = {
  RECRUITER_PROFILE_TABS: 'RECRUITER_PROFILE_TABS',
  JOB_POSTING_DETAILS: 'JOB_POSTING_DETAILS',
};
export type RecruiterProfileStackRootParams = {
  [RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS]: {};
  [RecruiterProfileStackRoutes.JOB_POSTING_DETAILS]: {
    jobPosting: IJobPostingDB;
  };
};
const Stack = createNativeStackNavigator();
const RecruiterProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS}
        component={RecruiterProfileScreen}
      ></Stack.Screen>
      <Stack.Screen
        name={RecruiterProfileStackRoutes.JOB_POSTING_DETAILS}
        component={JobDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecruiterProfileStack;
