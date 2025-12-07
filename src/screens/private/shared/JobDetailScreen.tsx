import React from 'react';

import Candidates from '../../../components/private/recruiter/Candidates';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RecruiterProfileStackRootParams } from '../recruiter/RecruiterProfileStack';

import JobDetail from '@components/shared/JobDetail';

interface JobDetailsScreenProps
  extends NativeStackScreenProps<
    RecruiterProfileStackRootParams,
    'JOB_POSTING_DETAILS'
  > {}

const JobDetailsScreen = ({ route }: JobDetailsScreenProps) => {
  // const route: RouteProp<
  //   {
  //     [RecruiterProfileStackRoutes.JOB_POSTING_DETAILS]: {
  //       jobPosting: IJobPostingDB;
  //     };
  //   },
  //   'JOB_POSTING_DETAILS'
  // > = useRoute();

  return (
    <>
      <JobDetail jobPosting={route.params.jobPosting}></JobDetail>
      <Candidates></Candidates>
    </>
  );
};
export default JobDetailsScreen;
