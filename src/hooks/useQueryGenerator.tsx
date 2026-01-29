import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import { isProfessional, isRecruiter } from '@utils/checkUserType';
import { Role } from 'src/types/authContextTypes/userRole';
import { jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import queryByUserRole from '../utils/queryGenerator';
import {
  orderBy,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  where,
} from 'firebase/firestore';
// const queryByUserRole = {
//   [Role.PROFESSIONAL]: queryGeneratorProfessional,
//   [Role.RECRUITER]: queryGeneratorRecruiter,
// } as const;
const useQueryGenerator = (user: UserTypes) => {
  function queryByUserRole(
    jobsPostingStatusParam: jobPostingStatus = jobPostingStatus.ACTIVE,
  ): (QueryFieldFilterConstraint | QueryOrderByConstraint)[] {
    if (isRecruiter(user)) {
      return [
        where('recruiter_id', '==', user.id),
        where('status', '==', jobsPostingStatusParam),

        orderBy('updatedAt', 'desc'),
      ];
    }
    if (isProfessional(user)) {
      return [
        where('skills', 'array-contains-any', user.skills),
        where('status', '==', jobsPostingStatusParam),

        orderBy('updatedAt', 'desc'),
      ];
    }
    return [];
  }
  return { queryByUserRole };
};

export default useQueryGenerator;
