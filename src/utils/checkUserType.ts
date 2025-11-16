import {
  IProfessional,
  IRecruiter,
  IUser,
  UserTypes,
} from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';

export const isProfessional = (
  user: Record<string, any>
): user is IProfessional => {
  return user.role === Role.PROFESSIONAL;
};
export const isRecruiter = (user: Record<string, any>): user is IRecruiter => {
  return user.role === Role.RECRUITER;
};
export const getUserTypeByRole = (user: IUser): UserTypes => {
  switch (user.role) {
    case Role.PROFESSIONAL:
      return user as IProfessional;
    case Role.RECRUITER:
      return user as IRecruiter;
    default:
      throw new Error(`Unknown role ${user.role}`);
  }
};
