import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import {
  and,
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { UserTypes } from 'src/types/authContextTypes/authContextTypes';

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
  const checkIsLoadingData = useCallback(
    () => loading.activa || loading.cerrada || loading.pausada,
    [loading]
  );
  // Track if there are more items to load
  const [hasMore, setHasMore] = useState<
    Record<jobPostingStatus, 'initial' | boolean>
  >({
    activa: 'initial',
    cerrada: 'initial',
    pausada: 'initial',
  });
  // Keep track of last document per status for pagination
  const lastDocRef = useRef<Record<jobPostingStatus, DocumentSnapshot | null>>({
    activa: null,
    cerrada: null,
    pausada: null,
  });

  const [errors, setErrors] = useState<Record<jobPostingStatus, Error>>({
    activa: { error: false, message: null },
    cerrada: { error: false, message: null },
    pausada: { error: false, message: null },
  });
  const PAGE_SIZE = 5;
  // Helper to manually PREPEND a new job to the list
  const addLocalJob = useCallback((newJob: IJobPostingDB) => {
    setJobPostings((prev) => [newJob, ...prev]);
  }, []);
  const [hasJobPostings, setHasJobPostings] = useState(false);
  // Helper to manually UPDATE a specific job in the list
  const updateLocalJob = useCallback(
    (updatedJobData: Partial<IJobPosting> & { id: string }) => {
      setJobPostings((prev) => {
        const updatedJob = prev.find((job) => job.id === updatedJobData.id);
        const filteredList = prev.filter((job) => job.id !== updatedJobData.id);
        if (updatedJob) {
          filteredList.unshift({
            ...updatedJob,
            ...updatedJobData,
          } as IJobPostingDB);
        }
        return filteredList;
      });
    },
    []
  );

  const checkJobPostingsByUsersLength = async () => {
    const q = query(
      jobPostingCollection,
      where('recruiter_id', '==', user.id),
      where('status', '==', jobPostingStatus.PAUSED),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    setHasJobPostings(!querySnapshot.empty);
    //  const collectionResponse = await
  };
  const loadJobPostings = useCallback(
    async (jobsPostingStatusParam: jobPostingStatus, isRefresh = false) => {
      let lastDocRefByStatus:
        | QueryDocumentSnapshot<IJobPostingDB, DocumentData>
        | undefined;
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
        let q: Query<IJobPostingDB, DocumentData> = query(
          jobPostingCollection,
          where('recruiter_id', '==', user.id),
          where('status', '==', jobsPostingStatusParam),
          // where('updatedAt', '<=', recentTimestamp),
          orderBy('updatedAt', 'desc'),

          ...(lastDocRef.current[jobsPostingStatusParam] && !isRefresh
            ? [startAfter(lastDocRef.current[jobsPostingStatusParam])]
            : []),
          limit(PAGE_SIZE + 1)
        );

        const querySnapshot = await getDocs(q);
        const collectionRes = querySnapshot.docs.map<IJobPostingDB>((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (collectionRes.length > PAGE_SIZE) {
          lastDocRefByStatus = querySnapshot.docs.at(-2);
          collectionRes.pop();
          setHasMore((prev) => ({
            ...prev,
            [jobsPostingStatusParam]: true,
          }));
        } else {
          setHasMore((prev) => ({
            ...prev,
            [jobsPostingStatusParam]: false,
          }));
          lastDocRefByStatus = querySnapshot.docs.at(-1);
        }

        if (
          hasMore[jobsPostingStatusParam] === 'initial' ||
          hasMore[jobsPostingStatusParam] === true
        ) {
          setJobPostings((prev) => {
            // A simpler fix for now:
            // If isRefresh is true, we should filter out the current status from 'prev'
            // and then add the new 'collectionRes'.

            if (isRefresh) {
              const otherStatusJobs = prev.filter(
                (job) => job.status !== jobsPostingStatusParam
              );
              return [...otherStatusJobs, ...collectionRes];
            }
            // return [...prev, ...collectionRes];
            // 2. Handle Load More (The Safety Net 🕸️)
            // Filter out any new item that is ALREADY in the 'prev' list
            const uniqueNewItems = collectionRes.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem.id === newItem.id)
            );

            return [...prev, ...uniqueNewItems];
          });
        }
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
        lastDocRef.current = {
          ...lastDocRef.current,
          [jobsPostingStatusParam]: lastDocRefByStatus,
        };
      }
    },
    [user]
  );

  return {
    loadJobPostings,
    jobPostings,
    loading,
    errors,
    lastDocRef,
    hasMore,
    addLocalJob,
    updateLocalJob,
    checkIsLoadingData,
    checkJobPostingsByUsersLength,
    hasJobPostings,
  };
};

export default useGetJobPostings;
