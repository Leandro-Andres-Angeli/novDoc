import { IProfessional } from 'src/components/SignUp';

export const isProfessional = (
  user: Record<string, any>
): user is IProfessional => {
  return user?.skills;
};
export const isRecruiter = (
  user: Record<string, any>
): user is IProfessional => {
  return user?.skills === false;
};
