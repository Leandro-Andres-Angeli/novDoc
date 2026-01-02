import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { IJobPostingDB, jobPostingStatus } from 'src/types/dbTypes/IJobOffer';
import {
  and,
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { IUser, UserTypes } from 'src/types/authContextTypes/authContextTypes';
import { getJobPostings } from 'src/services/jobOffer/jobOffer.service';
import { FirebaseErrorResponse } from 'src/types/firebaseResponse/firebaseResponses';
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
  /*  const loadJobPostings = useCallback(
    async (jobsPostingStatusParam: jobPostingStatus) => {
      setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: true }));
      setErrors((prev) => ({
        ...prev,
        [jobsPostingStatusParam]: { error: false, message: null },
      }));
      try {
        // console.log('FETCHINNGGG JOBPOSTINGS ');
        // setJobPostings((prev) => ({
        //   ...prev,
        //   [jobsPostingStatusParam]: [],
        // }));
        // let q = query(
        //   jobPostingCollection,
        //   where('recruiter_id', '==', user.id),
        //   where('status', '==', jobsPostingStatusParam),
        //   orderBy('updatedAt', 'desc'),
        //   limit(PAGE_SIZE)
        // );
        // const querySnapshot = await getDocs(q);
        // const collectionRes = querySnapshot.docs.map<IJobPostingDB>((doc) => ({
        //   ...doc.data(),
        //   id: doc.id,
        // }));
        // setJobPostings((prev) => ({
        //   ...prev,
        //   [jobsPostingStatusParam]: collectionRes,
        // }));

        const jobPosting = await getJobPostings(jobsPostingStatusParam);
         setJobPostings((prev) => ({
          ...prev,
          [jobsPostingStatusParam]: jobPosting ,
        }));
        if (!jobPosting.success) {
          throw Error((jobPosting as FirebaseErrorResponse).message);
        }
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [jobsPostingStatusParam]: {
            error: true,
            message: (err as Error).message,
          },
        }));
      } finally {
        // catch (error) {
        //   console.log(error);
        //   console.log('error fetching job Postings');
        //   setErrors((prev) => ({
        //     ...prev,
        //     [jobsPostingStatusParam]: {
        //       error: true,
        //       message: 'Error fetching job postings',
        //     },
        //   }));
        // }
        setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: false }));
      }
    },
    [user]
  ); */
  const loadJobPostings = useCallback(
    async (jobsPostingStatusParam: jobPostingStatus) => {
      if (!user) {
        console.log('USER NOT FOUND');
        return;
      }
      setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: true }));
      setErrors((prev) => ({
        ...prev,
        [jobsPostingStatusParam]: { error: false, message: null },
      }));
      // Only listen for offers created in the last minute

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
  const jobPostingUpdateListener = () => {
    const recentTimestamp = Timestamp.fromDate(new Date(Date.now() - 60000));
    let q = query(
      jobPostingCollection,
      and(
        where('recruiter_id', '==', user.id),

        where('updatedAt', '>', recentTimestamp)
      ),
      orderBy('updatedAt', 'desc'),
      limit(PAGE_SIZE)
    );
    const subscription = onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            console.log('ADDING POSTING ');
            const newDoc: IJobPostingDB = {
              ...change.doc.data(),
              id: change.doc.id,
            };
            setJobPostings((prev) => {
              const exists = prev[newDoc.status].some(
                (offer) => offer.id === newDoc.id
              );
              if (exists) return prev;
              return {
                ...prev,
                activa: [newDoc, ...prev['activa']],
              };
            });
          }
          if (change.type === 'modified') {
            console.log('IN MODIF');
            const updatedDoc: IJobPostingDB = {
              ...change.doc.data(),
              id: change.doc.id,
            };
            const jobPostingFiltered: Record<
              jobPostingStatus,
              IJobPostingDB[]
            > = {
              activa: [],
              cerrada: [],
              pausada: [],
            };
            Object.values(jobPostingStatus).forEach((key) => {
              console.log('KEYSSS', key);
              console.log('BEFORE FILTER LENGTH', jobPostings[key].length);
              const filteredJobPostingCategory = jobPostings[key].filter(
                (jobPosting) => jobPosting.id !== updatedDoc.id
              );
              console.log('AFTER FILTER LENGTH', jobPostings[key].length);
              if (key === updatedDoc.status) {
                filteredJobPostingCategory.unshift(updatedDoc);
              }

              jobPostingFiltered[key] = filteredJobPostingCategory;
            });

            setJobPostings((prev) => ({ ...prev, ...jobPostingFiltered }));
          }
        });
      },
      function (err) {
        console.log('IN ERROR');
        console.log('IN ERROR', err);
      }
    );
    return subscription;
  };
  useEffect(() => {
    console.log('rendering');
    const unsubscribe = jobPostingUpdateListener();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);
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
