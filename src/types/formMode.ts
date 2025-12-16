export const formModes = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
} as const;
export type FormMode = keyof typeof formModes;
