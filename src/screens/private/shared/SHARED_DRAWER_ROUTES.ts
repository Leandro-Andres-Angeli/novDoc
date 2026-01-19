export const SHARED_PROFILE_DRAWER_ROUTES = {
  PROFILE_STACK: 'PROFILE_STACK',
  SIGN_OUT: 'SIGN_OUT',
  EDIT_PROFILE: 'EDIT_PROFILE',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
} as const;
export type sharedProfileDrawerRoute =
  keyof typeof SHARED_PROFILE_DRAWER_ROUTES;
export const sharedProfileDrawerRootStack: Record<
  sharedProfileDrawerRoute,
  any
> = {
  PROFILE_STACK: {},
  EDIT_PROFILE: {},
  SIGN_OUT: {},
  UPDATE_PASSWORD: {},
};
