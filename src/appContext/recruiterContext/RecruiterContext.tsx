import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import {
  collection,
  query,
  Query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AuthContext } from '../authContext/AuthContext';
import { IJobPosting, IJobPostingDB } from 'src/types/dbTypes/IJobOffer';

export const useJobPosting = () => {};
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
