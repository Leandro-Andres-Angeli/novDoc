import { IProfessional } from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';

export const isProfessional = (
  user: Record<string, any>
): user is IProfessional => {
  return user.role === Role.PROFESSIONAL;
};
export const isRecruiter = (
  user: Record<string, any>
): user is IProfessional => {
  return user.role === Role.RECRUITER;
};
