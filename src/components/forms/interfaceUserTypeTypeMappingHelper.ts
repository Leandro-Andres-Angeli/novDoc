import { Role } from 'src/types/authContextTypes/userRole';
import {
  IProfessional,
  IRecruiter,
} from '../../types/authContextTypes/authContextTypes';

export interface UserTypeTypeMappingHelper {
  [Role.PROFESSIONAL]: IProfessional;
  [Role.RECRUITER]: IRecruiter;
}
