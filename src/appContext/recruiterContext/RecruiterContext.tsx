import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import {
  collection,
  query,
  Query,
  where,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from '../authContext/AuthContext';
import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import useGetJobPostings, {
  Error,
  jobPostingsArr,
} from 'src/hooks/useGetJobPostings';

export interface RecruiterContextInterface {
  // jobPostings: IJobPostingDB[];
  jobPostings: jobPostingsArr;
  // loading: boolean;
  loading: Record<jobPostingStatus, boolean>;
  // error: string;
  errors: Record<jobPostingStatus, Error>;
  loadJobPostings: (
    jobsPostingStatusParam: jobPostingStatus,
    isRefresh?: boolean
  ) => Promise<void>;
  hasMore: Record<jobPostingStatus, 'initial' | boolean>;
  lastDocRef: React.RefObject<
    Record<
      jobPostingStatus,
      DocumentSnapshot<DocumentData, DocumentData> | null
    >
  >;
}
export const RecruiterContext = createContext<RecruiterContextInterface>(
  {} as RecruiterContextInterface
);
interface RecruiterContextProviderProps extends PropsWithChildren {}
export const RecruiterContextProvider = (
  props: RecruiterContextProviderProps
) => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  if (!user) {
    throw Error('user not found');
  }

  const { loadJobPostings, loading, jobPostings, errors, hasMore, lastDocRef } =
    useGetJobPostings({
      user,
    });
  return (
    <RecruiterContext.Provider
      value={{
        errors,
        loading,
        jobPostings,
        loadJobPostings,
        hasMore,
        lastDocRef,
      }}
    >
      {props.children}
    </RecruiterContext.Provider>
  );
};
