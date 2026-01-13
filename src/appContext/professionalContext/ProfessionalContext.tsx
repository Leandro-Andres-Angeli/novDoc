import { createContext, PropsWithChildren } from 'react';

export interface ProfessionalContextInterface {}

export const ProfessionalContext = createContext<ProfessionalContextInterface>(
  {}
);
interface ProfessionalContextProviderProps extends PropsWithChildren {}
export const ProfessionalContextProvider = (
  props: ProfessionalContextProviderProps
) => {
  return (
    <ProfessionalContext.Provider value={{}}>
      {props.children}
    </ProfessionalContext.Provider>
  );
};
