import {
  IJobPostingHybrid,
  IJobPostingOnSite,
  IJobPostingRemote,
  JobLocation,
} from 'src/types/dbTypes/IJobOffer';

const jobPostingHasLocation = (
  jobPostingForm: IJobPostingOnSite | IJobPostingHybrid | IJobPostingRemote
): jobPostingForm is IJobPostingHybrid | IJobPostingOnSite => {
  return (
    jobPostingForm.jobLocation === JobLocation.ON_SITE ||
    jobPostingForm.jobLocation === JobLocation.HYBRID
  );
};

export default jobPostingHasLocation;
