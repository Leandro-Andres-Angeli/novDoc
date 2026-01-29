import {
  orderBy,
  QueryConstraint,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  where,
} from 'firebase/firestore';
import { jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import { query } from 'firebase/firestore';
import { UserTypes } from '../types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';

export const queryGeneratorProfessional = (
  userId: string,
  jobsPostingStatusParam: jobPostingStatus,
) => {
  console.log('here generating query ');
  return [
    where('status', '==', jobPostingStatus.ACTIVE),

    orderBy('updatedAt', 'desc'),
  ];
};
export const queryGeneratorRecruiter = (
  userId: string,
  jobsPostingStatusParam: jobPostingStatus,
): (QueryFieldFilterConstraint | QueryOrderByConstraint)[] => {
  return [
    where('recruiter_id', '==', userId),
    where('status', '==', jobsPostingStatusParam),

    orderBy('updatedAt', 'desc'),
  ];
};

const queryByUserRole = {
  [Role.PROFESSIONAL]: queryGeneratorProfessional,
  [Role.RECRUITER]: queryGeneratorRecruiter,
} as const;
export default queryByUserRole;
