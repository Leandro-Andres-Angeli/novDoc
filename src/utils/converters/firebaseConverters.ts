import { getUserTypeByRole } from '@utils/checkUserType';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { IUser, UserTypes } from 'src/types/authContextTypes/authContextTypes';

export const userConverter: FirestoreDataConverter<UserTypes> = {
  toFirestore: (user: UserTypes) => {
    return user;
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined
  ): UserTypes => {
    const user = snapshot.data(options) as IUser;

    return getUserTypeByRole(user);
  },
};
export const genericConverter = <T extends DocumentData>() => {
  const converter: FirestoreDataConverter<T> = {
    toFirestore: (model: WithFieldValue<T>): WithFieldValue<DocumentData> => {
      return model;
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
      options: SnapshotOptions | undefined
    ): T => {
      const data = snapshot.data(options) as T;
      return data;
    },
  };
  return converter;
};
