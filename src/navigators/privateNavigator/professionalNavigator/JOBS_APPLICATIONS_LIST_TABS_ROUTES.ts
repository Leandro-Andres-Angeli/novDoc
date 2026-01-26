import { IJobApplicationStatus } from 'src/types/dbTypes/IJobProposal';

const JOBS_APPLICATIONS_LIST_TABS_ROUTES = {
  [IJobApplicationStatus.APPLIED]: IJobApplicationStatus.APPLIED,
  [IJobApplicationStatus.VIEWED]: IJobApplicationStatus.VIEWED,
  [IJobApplicationStatus.MATCH]: IJobApplicationStatus.MATCH,

  [IJobApplicationStatus.REJECTED]: IJobApplicationStatus.REJECTED,
} as const;

export default JOBS_APPLICATIONS_LIST_TABS_ROUTES;
