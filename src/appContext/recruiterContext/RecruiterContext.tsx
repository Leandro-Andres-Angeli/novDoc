import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import {
  collection,
  query,
  Query,
  where,
  onSnapshot,
  DocumentSnapshot,
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

const jobPostingCollection = collection(db, 'jobPostings').withConverter(
  genericConverter<IJobPostingDB>()
);
export interface jobPostingsObj {
  [jobPostingStatus.ACTIVE]: Array<IJobPostingDB>;
  [jobPostingStatus.CLOSED]: Array<IJobPostingDB>;
  [jobPostingStatus.PAUSED]: Array<IJobPostingDB>;
}
export const useJobPosting = () => {
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

  const loadJobPostings = async (jobsPostingStatusParam: jobPostingStatus) => {
    setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: true }));
    try {
      console.log('FETCHINNGGG JOBPOSTINGS ');
      setJobPostings((prev) => ({
        ...prev,
        [jobsPostingStatusParam]: [],
      }));
      // let q = query(jobPostingCollection, where());
    } catch (error) {
      console.log('error fetching job Postings');
    } finally {
      setLoading((prev) => ({ ...prev, [jobsPostingStatusParam]: false }));
    }
  };
};
export interface RecruiterContextInterface {
  jobPostings: IJobPostingDB[];
  loading: boolean;
  error: string;
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
  const jobPostingsCollection = collection(db, 'jobPostings').withConverter(
    genericConverter<IJobPosting>()
  );
  const [jobPostings, setjobPostings] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const q = query(jobPostingsCollection, where('recruiter_id', '==', user?.id));
  const jobPostingUpdateListener = () => {
    if (!user) {
      return;
    }
    setLoading(true);
    const subscription = onSnapshot(
      q,
      function (doc) {
        setjobPostings(doc.docs.map((el) => ({ id: el.id, ...el.data() })));
        setLoading(false);
      },
      (err) => {
        console.log('error in job offers subscription');
        setjobPostings([]);
        setLoading(false);
        setError('error obteniendo ofertas de trabajo');
      }
    );
    setLoading(false);
    return subscription;
  };
  useEffect(() => {
    const unsubscribe = jobPostingUpdateListener();
    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [user]);

  return (
    <RecruiterContext.Provider value={{ error, loading, jobPostings }}>
      {props.children}
    </RecruiterContext.Provider>
  );
};
