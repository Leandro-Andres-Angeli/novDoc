import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { IJobOffer, IJobPostingDB } from 'src/types/dbTypes/IJobOffer';
import {
  FirebaseErrorResponse,
  FirebaseResponse,
} from 'src/types/firebaseResponse/firebaseResponses';
const jobsOfferCollection = collection(db, 'jobOffers').withConverter(
  genericConverter<IJobOffer>()
);
export const createJobOffer = async (
  jobOffer: IJobOffer
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const savedOffer = await addDoc(jobsOfferCollection, jobOffer);
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
export const updateJobOffer = async (
  idToUpdate: string,
  jobOfferUpdate: IJobOffer
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const docRef = await doc(db, 'jobOffers', idToUpdate);

    const updatedOffer = await updateDoc(docRef, { ...jobOfferUpdate });
    console.log('update res', updatedOffer);
    return { message: 'Oferta actualizada', success: true };
  } catch (error) {
    console.log('error saving job offer');
    console.log(error);
    return { success: false, message: 'Error actualizando oferta' };
  }
};
