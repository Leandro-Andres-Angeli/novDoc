//TODO type user
export type IUser = Record<string, any>;
//TODO type user
export type IAuthState =
  | { logged: false; user: null }
  | { logged: true; user: IUser };
export const initialAuthState: IAuthState = {
  logged: false,
  user: null,
};
