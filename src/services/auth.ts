import { auth, db } from 'firebase/config';
import { IUser } from '../types/authContextTypes/authContextTypes';
import { ISignUpUser } from 'src/components/SignUp';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  FirebaseErrorResponse,
  FirebaseSignUpResponse,
} from 'src/types/firebaseResponse/firebaseResponses';

const userCollection = collection(db, 'users');
export const signUpNewUser = async (
  user: ISignUpUser
): Promise<FirebaseSignUpResponse> => {
  try {
    const userSignUp = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const { password, ...userWithoutPassword } = user;

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

export const signInUser = async (
  email: string,
  password: string
): Promise<void | FirebaseErrorResponse> => {
  try {
    const signedUser = await signInWithEmailAndPassword(auth, email, password);
    if (signedUser) {
      console.log('SUCCESS', signedUser);
    } else {
      console.log('not found ');
      return {
        message: 'datos de login incorrectos',
        success: false,
      };
    }
  } catch (error) {
    console.log('in catch', error);
    return {
      message: 'error al intentar hacer login',
      success: false,
    };
  }
};
