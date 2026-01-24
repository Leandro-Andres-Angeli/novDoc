import { FormikHelpers } from 'formik';
import { FormMode } from './formMode';

import {
  IProfessional,
  IRecruiter,
  IUser,
  UserTypes,
} from './authContextTypes/authContextTypes';
import { IJobPosting } from './dbTypes/IJobOffer';
import { PropsWithChildren } from 'react';

interface GenericFormProps<T, K = T> {
  handleSubmit: (values: T, helpers: FormikHelpers<any>) => Promise<void>;
  loading: boolean;
  submitTextBtn?: string;
  valuesToEdit?: K;
}
export type UpdateRecruiterProfileFormShape = IUser & Omit<IRecruiter, 'jobs'>;
export type UpdateProfessionalProfileFormShape = IUser & IProfessional;

export interface JobPostingFormProps<
  T,
  K = IJobPosting,
> extends GenericFormProps<T, K> {
  userId: string;
  valuesToEdit?: K & { id: string };
  mode?: FormMode;
}
export interface EditProfileFormProps<T, K, L>
  extends GenericFormProps<T, K>, PropsWithChildren {
  user: L;
}
