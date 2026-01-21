import { ISkill } from '../dbTypes/ISkills';
import { Role } from './userRole';

//TODO type user
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  avatarUrl?: string | undefined;
}
export interface IProfessional extends IUser {
  skills: Array<ISkill>;
  languages: Array<string>;
  role: Role.PROFESSIONAL;
}
export interface IRecruiter extends IUser {
  role: Role.RECRUITER;
  jobs: Array<string>;
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
