import { View, Text } from 'react-native';
import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import JobOffersList from './JobOffersList';
import JobOfferScreen from '../professional/JobOfferScreen';
import JobsListTabNavigator from 'src/navigators/privateNavigator/recruiterNavigator/JobsListTabNavigator';
import RecruiterProfileScreen from './RecruiterProfileScreen';
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
    >
      <Stack.Screen
        name={RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS}
        component={RecruiterProfileScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecruiterProfileStack;
