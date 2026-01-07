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
export type jobPostingsArr = Array<IJobPostingDB>;

interface useGetJobPostingsProps {
  user: UserTypes;
}
export const useGetJobPostings = ({ user }: useGetJobPostingsProps) => {
  const [jobPostings, setJobPostings] = useState<jobPostingsArr>([]);
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
        // setJobPostings((prev) => [...prev]);
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
        setJobPostings((prev) => [...prev, ...collectionRes]);
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
  const jobPostingUpdateListener = useCallback(() => {
    const recentTimestamp = Timestamp.fromDate(new Date(Date.now() - 60000));
    console.log('rec', recentTimestamp == Timestamp.fromDate(new Date()));
    let q = query(
      jobPostingCollection,

      where('recruiter_id', '==', user.id),

      // where('updatedAt', '>', recentTimestamp),

      orderBy('updatedAt', 'desc')
    );

    console.log('🟡 About to set up onSnapshot...'); // Add this!
    const subscription = onSnapshot(
      q,
      (snapshot) => {
        // console.log('🟢 onSnapshot FIRED! Docs:', snapshot.docs); // Add this!
        // console.log('🟢 onSnapshot FIRED! Docs:', snapshot.docs.length); // Add this!
        // // ... rest
        // console.log('snapshoooot ', snapshot.docs);
        // console.log('snapshoooot  changes', snapshot.docChanges());

        snapshot.docChanges().forEach((change) => {
          console.log('EACH CHANGE ', change.type);
          console.log('snapshoooot  changes');
          console.log('snapshoooot  changes');
          if (change.type === 'added') {
            // console.log('doccccc', change.doc.data());

            const createdJobPosting: IJobPostingDB = {
              ...change.doc.data(),
              id: change.doc.id,
            };
            console.log('XXXX', createdJobPosting);

            return setJobPostings((prev) => {
              const [exists] = prev.filter(
                (el) => el.id === createdJobPosting.id
              );
              if (exists) {
                return prev.map((el) =>
                  el.id === exists.id ? { ...el, createdJobPosting } : el
                );
              }
              return [createdJobPosting, ...prev];
            });
          }
          if (change.type === 'modified') {
            const updatedDoc: IJobPostingDB = {
              ...change.doc.data(),
              id: change.doc.id,
            };
            console.log('HEREEEEEEEE');
            console.log('HEREEEEEEEE UPDATE', updatedDoc.id);

            setJobPostings((prev) => {
              return prev.map((el) =>
                el.id === updatedDoc.id ? { ...el, ...updatedDoc } : el
              );
            });
          }
        });
      },
      function (err) {
        console.log('IN ERROR');
        console.log('IN ERROR', err);
      }
    );

    return subscription;
  }, [user]);
  useEffect(() => {
    const unsubscribe = jobPostingUpdateListener();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);
  return { loadJobPostings, jobPostings, loading, errors };
};

export default useGetJobPostings;
