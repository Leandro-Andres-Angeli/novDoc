import { FormikHelpers } from 'formik';
import { FormMode } from './formMode';
import { IJobOffer } from './dbTypes/IJobOffer';
import {
  IRecruiter,
  IUser,
  UserTypes,
} from './authContextTypes/authContextTypes';

interface GenericFormProps<T, K = T> {
  handleSubmit: (values: T, helpers: FormikHelpers<any>) => Promise<void>;
  loading: boolean;
  submitTextBtn?: string;
  valuesToEdit?: K;
}
export type UpdateRecruiterProfileFormShape = IUser & Omit<IRecruiter, 'jobs'>;

export interface JobPostingFormProps<T, K = IJobOffer>
  extends GenericFormProps<T, K> {
  userId: string;
  valuesToEdit?: K;
  mode?: FormMode;
}
export interface EditProfileFormProps<T, K> extends GenericFormProps<T, K> {
  user: UserTypes;
}
