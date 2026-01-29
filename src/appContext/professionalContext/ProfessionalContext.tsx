import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext } from 'react';
import useGetJobPostings, {
  Error,
  jobPostingsArr,
} from 'src/hooks/useGetJobPostings';
import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import { AuthContext } from '../authContext/AuthContext';

export interface ProfessionalContextInterface {
  jobPostings: jobPostingsArr;

  loading: Record<jobPostingStatus, boolean>;

  errors: Record<jobPostingStatus, Error>;
  loadJobPostings: (
    jobsPostingStatusParam: jobPostingStatus,
    isRefresh?: boolean,
  ) => Promise<void>;
  hasMore: Record<jobPostingStatus, 'initial' | boolean>;
  addLocalJob: (newJob: IJobPostingDB) => void;
  checkIsLoadingData: () => boolean;
  checkJobPostingsByUsersLength: () => Promise<void>;
  hasJobPostings: boolean;
  updateLocalJob: (
    updatedJobData: Partial<IJobPosting> & { id: string },
  ) => void;
  lastDocRef: React.RefObject<
    Record<
      jobPostingStatus,
      DocumentSnapshot<DocumentData, DocumentData> | null
    >
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
    errors,
    hasMore,
    lastDocRef,
    addLocalJob,
    updateLocalJob,
    hasJobPostings,
    checkJobPostingsByUsersLength,
    checkIsLoadingData,
  } = useGetJobPostings({
    user,
  });
  return (
    <ProfessionalContext.Provider
      value={{
        addLocalJob,
        updateLocalJob,
        errors,
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
