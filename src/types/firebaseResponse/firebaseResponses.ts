export interface FirebaseSignUpResponse {
  success: boolean;
  message: string;
}
export interface FirebaseErrorResponse {
  success: false;
  message: string;
}
export interface FirebaseResponse {
  success: true;
  message: string;
}
