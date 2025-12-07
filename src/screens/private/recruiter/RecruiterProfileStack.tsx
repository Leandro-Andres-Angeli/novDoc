import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

import RecruiterProfileScreen from './RecruiterProfileScreen';
import JobDetailsScreen from 'src/screens/private/shared/JobDetailScreen';
import { useTheme } from 'react-native-paper';

export const RecruiterProfileStackRoutes = {
  RECRUITER_PROFILE_TABS: 'RECRUITER_PROFILE_TABS',
  JOB_POSTING_DETAILS: 'JOB_POSTING_DETAILS',
} as const;
export type RecruiterProfileStackRootParams = {
  [RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS]: {};
  [RecruiterProfileStackRoutes.JOB_POSTING_DETAILS]: {
    jobPosting: IJobPostingDB;
  };
};
const Stack = createNativeStackNavigator<RecruiterProfileStackRootParams>();
const RecruiterProfileStack = () => {
  const theme = useTheme();
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
        component={JobDetailsScreen}
        options={{
          headerShown: true,
          title: 'Detalle de la oferta',
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecruiterProfileStack;
