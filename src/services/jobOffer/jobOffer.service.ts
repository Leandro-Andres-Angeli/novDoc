import { genericConverter } from '@utils/converters/firebaseConverters';
import { FirebaseError } from 'firebase/app';
import { db } from 'firebase/config';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  IJobPosting,
  IJobPostingDB,
  jobPostingStatus,
} from 'src/types/dbTypes/IJobOffer';

import {
  FirebaseErrorResponse,
  FirebaseResponse,
} from 'src/types/firebaseResponse/firebaseResponses';
const jobsOfferCollection = collection(db, 'jobPostings').withConverter(
  genericConverter<IJobPosting>()
);
export const createjobPosting = async (
  jobPosting: IJobPosting
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const savedOffer = await addDoc(jobsOfferCollection, jobPosting);
    if (savedOffer) {
      return { message: 'Oferta creada correctamente', success: true };
    } else {
      throw Error();
    }
  } catch (error) {
    console.log('error saving job offer');
    console.log(error);
    return { success: false, message: 'Error creando oferta' };
  }
};
export const updatejobPosting = async (
  idToUpdate: string,
  jobPostingUpdate: Partial<IJobPosting>
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const docRef = doc(db, 'jobPostings', idToUpdate);

    await updateDoc(docRef, { ...jobPostingUpdate });

    return { message: 'Oferta actualizada', success: true };
  } catch (error) {
    console.log('error saving job offer');
    console.log(error);
    return { success: false, message: 'Error actualizando oferta' };
  }
};

export const getJobPostings = async (
  jobPostingStatusParam: jobPostingStatus = jobPostingStatus.ACTIVE
) => {
  const PAGE_SIZE = 5;
  try {
    const q = query(
      jobsOfferCollection,
      where('status', '==', jobPostingStatusParam),
      orderBy('updatedAt', 'desc'),

      orderBy('createdAt', 'desc'),

      limit(PAGE_SIZE)
    );
    const querySnapshot = await getDocs(q);
    const collectionRes = querySnapshot.docs.map<IJobPostingDB>((el) => ({
      id: el.id,
      ...el.data(),
    }));

    return { success: true, data: collectionRes };
  } catch (err) {
    const parsedError = err as unknown as Error;
    console.log('errr', err);
    const errorRes: FirebaseErrorResponse = {
      message: parsedError.message ?? err,
      success: false,
    };
    return errorRes as FirebaseErrorResponse;
  }
};
