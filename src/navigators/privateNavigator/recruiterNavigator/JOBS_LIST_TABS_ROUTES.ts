import { JobOfferStatus } from '../../../types/dbTypes/IJobOffer';

export const JOBS_LIST_TABS_ROUTES = {
  [JobOfferStatus.ACTIVE]: JobOfferStatus.ACTIVE,
  [JobOfferStatus.CLOSED]: JobOfferStatus.CLOSED,
  [JobOfferStatus.PAUSED]: JobOfferStatus.PAUSED,
};

export default JOBS_LIST_TABS_ROUTES;
