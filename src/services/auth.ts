import { auth, db } from 'firebase/config';
import { IUser, UserTypes } from '../types/authContextTypes/authContextTypes';
import { ISignUpUser } from 'src/components/SignUp';
import { addDoc, collection, DocumentData } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';
import {
  FirebaseErrorResponse,
  FirebaseResponse,
  FirebaseSignUpResponse,
} from 'src/types/firebaseResponse/firebaseResponses';
import { Role } from 'src/types/authContextTypes/userRole';
import { userConverter } from '@utils/converters/firebaseConverters';

const userCollection = collection(db, 'users');
export const signUpNewUser = async (
  user: ISignUpUser,
): Promise<FirebaseSignUpResponse> => {
  try {
    const userSignUp = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );
    const { password, ...userWithoutPassword } = user;

    if (userSignUp) {
      await addDoc(userCollection, {
        id: userSignUp.user.uid,
        ...userWithoutPassword,
        ...(user.role === Role.PROFESSIONAL && {
          ...{ skills: [], languages: [] },
        }),
      });
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
  password: string,
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const signedUser = await signInWithEmailAndPassword(auth, email, password);
    if (signedUser) {
      return {
        success: true,
        message: 'login exitoso',
      };
    } else {
      throw Error('login error');
    }
  } catch (error) {
    return {
      message: 'error al intentar hacer login',
      success: false,
    };
  }
};
export const signOutUser = async (): Promise<
  FirebaseResponse | FirebaseErrorResponse
> => {
  try {
    await signOut(auth);
    return {
      message: 'signout success',
      success: true,
    };
  } catch (error) {
    return {
      message: 'signout error',
      success: false,
    };
  }
};
export const updateUserPassword = async (
  newPassword: string,
): Promise<FirebaseResponse | FirebaseErrorResponse> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw Error('Error getting current user');
    }
    await updatePassword(currentUser, newPassword);
    return { success: true, message: 'Contraseña actualizada' };
  } catch (error) {
    const parsedError = error as Error;
    console.log('errr', error);
    // let message = FirebaseError: Firebase: Error (auth/requires-recent-login)
    let message =
      (parsedError.message.includes('requires-recent-login') &&
        'Debe volver a loguearse para poder modificar su contraseña') ||
      parsedError?.message ||
      'Error actualizando contraseña';
    return {
      success: false,
      message: message,
    };
  }
};
