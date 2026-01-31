import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext } from 'react';

import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import { AuthContext } from '../authContext/AuthContext';
import useGetJobPostingsForProfessional, {
  jobPostingsArr,
  Error,
} from 'src/hooks/useGetJobPostingsForProfessional';

export interface ProfessionalContextInterface {
  jobPostings: jobPostingsArr;

  loading: boolean;

  error: Error;
  loadJobPostings: (isRefresh?: boolean, reset?: boolean) => Promise<void>;
  hasMore: boolean | 'initial';
  addLocalJob: (newJob: IJobPostingDB) => void;
  checkIsLoadingData: () => boolean;
  checkJobPostingsByUsersLength: () => Promise<void>;
  hasJobPostings: boolean;
  updateLocalJob: (
    updatedJobData: Partial<IJobPosting> & { id: string },
  ) => void;
  lastDocRef: React.RefObject<
    QueryDocumentSnapshot<IJobPostingDB, DocumentData> | undefined
  >;
}

export const ProfessionalContext = createContext<ProfessionalContextInterface>(
  {} as ProfessionalContextInterface,
);
interface ProfessionalContextProviderProps extends PropsWithChildren {}
export const ProfessionalContextProvider = (
  props: ProfessionalContextProviderProps,
) => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  if (!user) {
    throw Error('user not found');
  }

  const {
    loadJobPostings,
    loading,
    jobPostings,
    error,
    hasMore,
    lastDocRef,
    addLocalJob,
    updateLocalJob,
    hasJobPostings,
    checkJobPostingsByUsersLength,
    checkIsLoadingData,
  } = useGetJobPostingsForProfessional({
    user,
  });
  return (
    <ProfessionalContext.Provider
      value={{
        addLocalJob,
        updateLocalJob,
        error,
        loading,
        jobPostings,
        loadJobPostings,
        hasMore,
        lastDocRef,
        checkIsLoadingData,
        hasJobPostings,
        checkJobPostingsByUsersLength,
      }}
    >
      {props.children}
    </ProfessionalContext.Provider>
  );
};
