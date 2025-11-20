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
import { IJobOffer } from '../types/dbTypes/IJobOffer';
import { AuthContext } from './AuthContext';

export interface RecruiterContextInterface {
  jobOffers: Record<string, any>[];
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
  const [jobOffers, setJobOffers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const q = query(jobOffersCollection, where('recruiter_id', '==', user?.id));
  const jobOfferUpdateListener = () => {
    console.log('LISTENING');
    if (!user) {
      return;
    }
    setLoading(true);
    const subscription = onSnapshot(
      q,
      function (doc) {
        console.log('listening');
        console.log('args', arguments);
        console.log(doc.docs);
        console.log(doc.docChanges());
        doc.docs.map((el) => console.log(el.data()));
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
    jobOfferUpdateListener();
  }, []);

  return (
    <RecruiterContext.Provider value={{ error, loading, jobOffers }}>
      {props.children}
    </RecruiterContext.Provider>
  );
};
