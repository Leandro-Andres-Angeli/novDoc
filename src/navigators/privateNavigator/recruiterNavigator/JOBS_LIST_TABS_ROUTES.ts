import { jobPostingStatus } from '../../../types/dbTypes/IJobPosting';

export const JOBS_LIST_TABS_ROUTES = {
  [jobPostingStatus.ACTIVE]: jobPostingStatus.ACTIVE,
  [jobPostingStatus.CLOSED]: jobPostingStatus.CLOSED,
  [jobPostingStatus.PAUSED]: jobPostingStatus.PAUSED,
};

export default JOBS_LIST_TABS_ROUTES;
