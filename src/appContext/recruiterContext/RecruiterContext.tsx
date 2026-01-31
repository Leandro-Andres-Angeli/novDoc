import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext } from 'react';

import { AuthContext } from '../authContext/AuthContext';
import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import useGetJobPostings, {
  Error,
  jobPostingsArr,
  useGetJobPostingsForRecruiter,
} from 'src/hooks/useGetJobPostingsForRecuiter';
import { isRecruiter } from '@utils/checkUserType';

export interface RecruiterContextInterface {
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
export const RecruiterContext = createContext<RecruiterContextInterface>(
  {} as RecruiterContextInterface,
);
interface RecruiterContextProviderProps extends PropsWithChildren {}
export const RecruiterContextProvider = (
  props: RecruiterContextProviderProps,
) => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  if (!user) {
    throw Error('user not found');
  }
  if (!isRecruiter(user)) {
    throw Error('Wrong user');
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
  } = useGetJobPostingsForRecruiter({
    user,
  });
  return (
    <RecruiterContext.Provider
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
    </RecruiterContext.Provider>
  );
};
