import { auth, db } from 'firebase/config';
import { IUser } from '../types/authContextTypes/authContextTypes';
import { ISignUpUser } from 'src/components/SignUp';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
interface FirebaseResponse {
  success: boolean;
  message: string;
}
const userCollection = collection(db, 'users');
export const signUpNewUser = async (
  user: ISignUpUser
): Promise<FirebaseResponse> => {
  try {
    const userSignUp = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const { password, ...userWithoutPassword } = user;
    console.log('HERE');
    console.log('HERE user', user);
    if (userSignUp) {
      await addDoc(userCollection, userWithoutPassword);
      return { success: true, message: 'Perfil creado' };
    } else {
      throw Error('Error creando usuario');
    }
  } catch (error) {
    const formattedError = error as unknown as FirebaseError;
    let message = 'Error creando cuenta';

    if (formattedError.message.includes('/email-already-in-use')) {
      message = 'Email ya registrado';
    }
    return { success: false, message: message };
  }
};
