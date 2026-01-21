import { Role } from 'src/types/authContextTypes/userRole';
import EditProfileProfessionalForm from './EditProfileProfessionalForm';
import EditProfileRecruiterForm from './EditProfileRecruiterForm';
export const editProfileTypeMapping = {
  [Role.RECRUITER]: EditProfileRecruiterForm,
  [Role.PROFESSIONAL]: EditProfileProfessionalForm,
} as const;
