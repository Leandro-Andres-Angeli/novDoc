import {
  IJobOfferOnSite,
  IJobOfferRemote,
  JobLocation,
} from 'src/types/dbTypes/IJobOffer';
import { IJobOfferHybrid } from '../types/dbTypes/IJobOffer';

const jobOfferHasLocation = (
  jobOfferForm: IJobOfferOnSite | IJobOfferHybrid | IJobOfferRemote
): jobOfferForm is IJobOfferHybrid | IJobOfferOnSite => {
  return (
    jobOfferForm.jobLocation === JobLocation.ON_SITE ||
    jobOfferForm.jobLocation === JobLocation.HYBRID
  );
};

export default jobOfferHasLocation;
