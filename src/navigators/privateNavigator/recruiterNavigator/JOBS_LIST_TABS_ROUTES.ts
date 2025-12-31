import { jobPostingStatus } from 'src/types/dbTypes/IjobPosting';

export const JOBS_LIST_TABS_ROUTES = {
  [jobPostingStatus.ACTIVE]: jobPostingStatus.ACTIVE,
  [jobPostingStatus.CLOSED]: jobPostingStatus.CLOSED,
  [jobPostingStatus.PAUSED]: jobPostingStatus.PAUSED,
} as const;

export default JOBS_LIST_TABS_ROUTES;
