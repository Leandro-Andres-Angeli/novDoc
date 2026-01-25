import { db } from 'firebase/config';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import {
  FirebaseErrorResponse,
  FirebaseResponse,
} from 'src/types/firebaseResponse/firebaseResponses';

const usersCollection = collection(db, 'users');
export const updateProfile = async (
  idToUpdate: string,
  updatedUser: Partial<UserTypes>,
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    // const docRef = await doc(db, 'users', 'id', idToUpdate);
    const q = query(usersCollection, where('id', '==', idToUpdate));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnap) => {
      await updateDoc(docSnap.ref, { ...updatedUser });
    });

    return { message: 'Perfil actualizado', success: true };
  } catch (error) {
    console.log('error saving job offer');
    console.log(error);
    return { success: false, message: 'Error actualizando perfil' };
  }
};
