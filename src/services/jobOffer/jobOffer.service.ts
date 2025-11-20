import { genericConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { IJobOffer } from 'src/types/dbTypes/IJobOffer';
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
