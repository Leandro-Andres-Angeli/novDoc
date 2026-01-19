import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import RecruiterProfileScreen from './RecruiterProfileScreen';
import JobDetailsScreen from 'src/screens/private/shared/JobDetailScreen';
import { useTheme } from 'react-native-paper';

import EditJobPostingScreen from './EditJobPostingScreen';
import AppHeaderWithSettingsLink from '@components/shared/AppHeaderWithSettingsLink';
import { CustomTheme } from 'src/providers/PublicProviders';
import { recruiterProfileDrawerRootStack } from './RecruiterProfileDrawer';
import {
  DrawerActions,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

export const RecruiterProfileStackRoutes = {
  RECRUITER_PROFILE_TABS: 'RECRUITER_PROFILE_TABS',
  JOB_POSTING_DETAILS: 'JOB_POSTING_DETAILS',
  EDIT_JOB_POSTING: 'EDIT_JOB_POSTING',
} as const;
export type RecruiterProfileStackRootParams = {
  [RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS]: {};
  [RecruiterProfileStackRoutes.JOB_POSTING_DETAILS]: {
    jobPosting: IJobPostingDB;
  };
  [RecruiterProfileStackRoutes.EDIT_JOB_POSTING]: {
    jobPosting: IJobPostingDB;
  };
};
const Stack = createNativeStackNavigator<RecruiterProfileStackRootParams>();
interface RecruiterProfileScreenProps extends NativeStackScreenProps<
  typeof recruiterProfileDrawerRootStack.PROFILE_STACK
> {}
const RecruiterProfileStack = ({ navigation }: RecruiterProfileScreenProps) => {
  const theme = useTheme<CustomTheme>();
  useFocusEffect(() => {
    return () => navigation.dispatch(DrawerActions.closeDrawer());
  });
  return (
    <Stack.Navigator
      initialRouteName={RecruiterProfileStackRoutes.RECRUITER_PROFILE_TABS}
      screenOptions={{
        headerShown: false,
      }}
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
      <Stack.Screen
        name={RecruiterProfileStackRoutes.EDIT_JOB_POSTING}
        component={EditJobPostingScreen}
        options={{
          headerShown: true,
          title: 'Editar Oferta',
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecruiterProfileStack;
