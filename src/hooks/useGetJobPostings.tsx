import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { getJobPostings } from 'src/services/jobOffer/jobOffer.service';
import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { IUser, UserTypes } from 'src/types/authContextTypes/authContextTypes';
const jobPostingCollection = collection(db, 'jobPostings').withConverter(
  genericConverter<IJobPostingDB>()
);
export type Error = {
  error: boolean;
  message: string | null;
};
export interface jobPostingsObj {
  [jobPostingStatus.ACTIVE]: Array<IJobPostingDB>;
  [jobPostingStatus.CLOSED]: Array<IJobPostingDB>;
  [jobPostingStatus.PAUSED]: Array<IJobPostingDB>;
}
interface useGetJobPostingsProps {
  user: UserTypes;
}
export const useGetJobPostings = ({ user }: useGetJobPostingsProps) => {
  const [jobPostings, setJobPostings] = useState<jobPostingsObj>({
    activa: [],
    cerrada: [],
    pausada: [],
  });
  // Track loading state per status
  const [loading, setLoading] = useState<Record<jobPostingStatus, boolean>>({
    activa: false,
    cerrada: false,
    pausada: false,
  });

  // Track if there are more items to load
  const [hasMore, setHasMore] = useState<Record<jobPostingStatus, boolean>>({
    activa: true,
    cerrada: true,
    pausada: true,
  });
  // Keep track of last document per status for pagination
  const lastDocRef = useRef<Record<jobPostingStatus, DocumentSnapshot | null>>({
    activa: null,
    cerrada: null,
    pausada: null,
  });
  // const [error, setError] = useState<{
  //   error: boolean;
  //   message: string | null;
  // }>({ error: false, message: null });

  const [errors, setErrors] = useState<Record<jobPostingStatus, Error>>({
    activa: { error: false, message: null },
    cerrada: { error: false, message: null },
    pausada: { error: false, message: null },
  });
  const PAGE_SIZE = 5;
  const loadJobPostings = useCallback(
    async (jobsPostingStatusParam: jobPostingStatus) => {
      setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: true }));
      setErrors((prev) => ({
        ...prev,
        [jobsPostingStatusParam]: { error: false, message: null },
      }));
      try {
        console.log('FETCHINNGGG JOBPOSTINGS ');
        setJobPostings((prev) => ({
          ...prev,
          [jobsPostingStatusParam]: [],
        }));
        let q = query(
          jobPostingCollection,
          where('recruiter_id', '==', user.id),
          where('status', '==', jobsPostingStatusParam),
          orderBy('updatedAt', 'desc'),
          limit(PAGE_SIZE)
        );
        const querySnapshot = await getDocs(q);
        const collectionRes = querySnapshot.docs.map<IJobPostingDB>((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setJobPostings((prev) => ({
          ...prev,
          [jobsPostingStatusParam]: collectionRes,
        }));
      } catch (error) {
        console.log(error);
        console.log('error fetching job Postings');
        setErrors((prev) => ({
          ...prev,
          [jobsPostingStatusParam]: {
            error: true,
            message: 'Error fetching job postings',
          },
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: false }));
      }
    },
    [user]
  );
  return { loadJobPostings, jobPostings, loading, errors };
};

export default useGetJobPostings;
/* 
const useGetJobPostings = (jobPostingStatus: jobPostingStatus) => {
  const [jobPostings, setJobPostings] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    error: boolean;
    message: string | null;
  }>({ error: false, message: null });

  const handleGetJobPostings = useCallback(async () => {
    try {
      setError({ error: false, message: null });
      setLoading(true);
      const jobPostingPromise = await getJobPostings(jobPostingStatus);
      if (jobPostingPromise.success) {
        setJobPostings(jobPostingPromise.data);
      }
    } catch (err) {
      console.log('errr', err);
      setError({ error: true, message: 'Error fetching job postings' });
    } finally {
      setLoading(false);
    }
  }, [jobPostingStatus]);

  useFocusEffect(
    useCallback(() => {
      console.log('in callback');
      handleGetJobPostings();
    }, [handleGetJobPostings])
  );
  return { jobPostings, loading, error };
};

export default useGetJobPostings; */
/* const useGetJobPostings = (jobPostingStatus: jobPostingStatus) => {
  const [jobPostings, setJobPostings] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    error: boolean;
    message: string | null;
  }>({ error: false, message: null });

  const handleGetJobPostings = useCallback(async () => {
    try {
      setError({ error: false, message: null });
      setLoading(true);
      const jobPostingPromise = await getJobPostings(jobPostingStatus);
      if (jobPostingPromise.success) {
        setJobPostings(jobPostingPromise.data);
      }
    } catch (err) {
      console.log('errr', err);
      setError({ error: true, message: 'Error fetching job postings' });
    } finally {
      setLoading(false);
    }
  }, [jobPostingStatus]);

  useFocusEffect(
    useCallback(() => {
      console.log('in callback');
      handleGetJobPostings();
    }, [handleGetJobPostings])
  );
  return { jobPostings, loading, error };
};

export default useGetJobPostings;
 */
