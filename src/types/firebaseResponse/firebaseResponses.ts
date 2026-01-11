import { IJobPostingDB } from '../dbTypes/IJobOffer';

export interface FirebaseSignUpResponse {
  success: boolean;
  message: string;
}
export interface FirebaseErrorResponse {
  success: false;
  message: string;
}
export interface FirebaseResponse<T = IJobPostingDB> {
  success: true;
  message: string;
  data: T;
}
