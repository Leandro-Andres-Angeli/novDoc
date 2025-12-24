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
import {
  IJobOffer,
  IJobPostingDB,
  IJobOfferGeneral,
  IJobOfferHybrid,
  IJobOfferOnSite,
} from '../../types/dbTypes/IJobOffer';
import { AuthContext } from '../authContext/AuthContext';
import { Unsubscribe } from 'firebase/auth';

export interface RecruiterContextInterface {
  jobOffers: IJobPostingDB[];
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
  const jobOffersCollection = collection(db, 'jobOffers').withConverter(
    genericConverter<IJobOffer>()
  );
  const [jobOffers, setJobOffers] = useState<IJobPostingDB[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const q = query(jobOffersCollection, where('recruiter_id', '==', user?.id));
  const jobOfferUpdateListener = () => {
    if (!user) {
      return;
    }
    setLoading(true);
    const subscription = onSnapshot(
      q,
      function (doc) {
        setJobOffers(doc.docs.map((el) => ({ id: el.id, ...el.data() })));
        setLoading(false);
      },
      (err) => {
        console.log('error in job offers subscription');
        setJobOffers([]);
        setLoading(false);
        setError('error obteniendo ofertas de trabajo');
      }
    );
    setLoading(false);
    return subscription;
  };
  useEffect(() => {
    const unsubscribe = jobOfferUpdateListener();
    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [user]);

  return (
    <RecruiterContext.Provider value={{ error, loading, jobOffers }}>
      {props.children}
    </RecruiterContext.Provider>
  );
};
