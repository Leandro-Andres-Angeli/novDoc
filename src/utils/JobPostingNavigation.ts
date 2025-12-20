import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import { IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

export type JobPostingNavigation = {
  [RECRUITER_NAVIGATOR_ROUTES.JOB_POSTING_DETAIL]: {
    jobPosting: IJobPostingDB;
  };
};
