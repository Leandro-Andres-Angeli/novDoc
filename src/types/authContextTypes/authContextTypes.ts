import { Role } from './userRole';

//TODO type user
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
}
export interface IProfessional extends IUser {
  skills: Array<string>;
  languages: Array<string>;
  role: Role.PROFESSIONAL;
}
export interface IRecruiter extends IUser {
  role: Role.RECRUITER;
}
export type UserTypes = IProfessional | IRecruiter;
//TODO type user
export type IAuthState =
  | { logged: false; user: null }
  | { logged: true; user: UserTypes };
export const initialAuthState: IAuthState = {
  logged: false,
  user: null,
};
