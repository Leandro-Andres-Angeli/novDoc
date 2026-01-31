import { useCallback, useRef, useState } from 'react';

import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { UserTypes } from 'src/types/authContextTypes/authContextTypes';

import useQueryGenerator from './useQueryGenerator';

const jobPostingCollection = collection(db, 'jobPostings').withConverter(
  genericConverter<IJobPostingDB>(),
);
export type Error = {
  error: boolean;
  message: string | null;
};
export type jobPostingsArr = Array<IJobPostingDB>;

interface useGetJobPostingsProps {
  user: UserTypes;
}

export const useGetJobPostingsForProfessional = ({
  user,
}: useGetJobPostingsProps) => {
  const [jobPostings, setJobPostings] = useState<jobPostingsArr>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const checkIsLoadingData = useCallback(() => {
    return !!loading;
  }, [loading]);
  // Track if there are more items to load
  const [hasMore, setHasMore] = useState<'initial' | boolean>('initial');
  // Keep track of last document per status for pagination
  const lastDocRef = useRef<
    QueryDocumentSnapshot<IJobPostingDB, DocumentData> | undefined
  >(undefined);

  const [error, setError] = useState<Error>({ error: false, message: null });
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
    [],
  );
  const { queryByUserRole } = useQueryGenerator(user);
  const checkJobPostingsByUsersLength = async () => {
    const q = query(jobPostingCollection, ...queryByUserRole(), limit(1));
    const querySnapshot = await getDocs(q);
    setHasJobPostings(!querySnapshot.empty);
    //  const collectionResponse = await
  };
  const loadJobPostings = useCallback(
    async (isRefresh = false, reset = false) => {
      let lastDocRefResult:
        | QueryDocumentSnapshot<IJobPostingDB, DocumentData>
        | undefined;
      if (!user) {
        console.log('USER NOT FOUND');
        return;
      }

      setLoading(true);
      setError({ error: false, message: null });

      const userQuery = queryByUserRole();

      try {
        let q: Query<IJobPostingDB, DocumentData> = query(
          jobPostingCollection,

          ...userQuery,
          ...(lastDocRef.current && !isRefresh
            ? [startAfter(lastDocRef.current)]
            : []),
          limit(PAGE_SIZE + 1),
        );

        const querySnapshot = await getDocs(q);
        const collectionRes = querySnapshot.docs.map<IJobPostingDB>((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (reset) {
          console.log('COLLECTION RES', collectionRes);
          console.log('RESETTTT');
          setJobPostings(collectionRes.slice(0, PAGE_SIZE));
          setHasMore(!!collectionRes.at(PAGE_SIZE + 1));
          lastDocRef.current = querySnapshot.docs.at(-2) ?? undefined;
          return;
        }
        if (collectionRes.length > PAGE_SIZE) {
          if (querySnapshot.docs.at(-2)) {
            lastDocRef.current = querySnapshot.docs.at(-2);
          }

          collectionRes.pop();
          setHasMore(true);
        } else {
          setHasMore(false);
          lastDocRefResult = querySnapshot.docs.at(-1);
        }

        if (hasMore === 'initial' || hasMore === true) {
          setJobPostings((prev) => {
            // A simpler fix for now:
            // If isRefresh is true, we should filter out the current status from 'prev'
            // and then add the new 'collectionRes'.

            if (isRefresh) {
              return [...prev, ...collectionRes];
            }
            // return [...prev, ...collectionRes];
            // 2. Handle Load More (The Safety Net 🕸️)
            // Filter out any new item that is ALREADY in the 'prev' list
            const uniqueNewItems = collectionRes.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem.id === newItem.id),
            );

            return [...prev, ...uniqueNewItems];
          });
        }
      } catch (error) {
        console.log(error);
        console.log('error fetching job Postings');
        setError({
          error: true,
          message: 'Error fetching job postings',
        });
      } finally {
        setLoading(false);
        lastDocRef.current = lastDocRefResult;
      }
    },
    [user],
  );

  return {
    loadJobPostings,
    jobPostings,
    loading,
    error,
    lastDocRef,
    hasMore,
    addLocalJob,
    updateLocalJob,
    checkIsLoadingData,
    checkJobPostingsByUsersLength,
    hasJobPostings,
  };
};

export default useGetJobPostingsForProfessional;
