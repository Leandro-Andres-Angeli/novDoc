import React from 'react';

import JobDetail from '../../../components/shared/JobDetail';
import Candidates from '../../../components/private/recruiter/Candidates';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobPostingNavigation } from '@utils/JobPostingNavigation';
import JobPostingCard from '../../../components/jobPostingCard/JobPostingCard';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from '../../../navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import {
  RecruiterProfileStackRootParams,
  RecruiterProfileStackRoutes,
} from '../recruiter/RecruiterProfileStack';
import RecruiterProfileStack from 'src/screens/private/recruiter/RecruiterProfileStack';

export default function JobDetailsScreen({}) {
  return (
    <>
      {/* <JobDetail ></JobDetail> */}
      <Candidates></Candidates>
    </>
  );
}
