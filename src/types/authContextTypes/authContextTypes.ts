import { Role } from './userRole';

//TODO type user
export interface IUser {
  name: string;
  lastName: string;
  email: string;
  role: Role;
}
//TODO type user
export type IAuthState =
  | { logged: false; user: null }
  | { logged: true; user: IUser };
export const initialAuthState: IAuthState = {
  logged: false,
  user: null,
};
