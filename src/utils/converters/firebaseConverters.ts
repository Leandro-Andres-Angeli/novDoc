import { getUserTypeByRole } from '@utils/checkUserType';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import {
  IProfessional,
  IRecruiter,
  IUser,
  UserTypes,
} from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';

export const userConverter: FirestoreDataConverter<UserTypes> = {
  toFirestore: (user: UserTypes) => {
    if (user.role === Role.PROFESSIONAL) {
      return user as IProfessional;
    } else {
      return user as IRecruiter;
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined,
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
      options: SnapshotOptions | undefined,
    ): T => {
      const data = snapshot.data(options) as T;
      return data;
    },
  };
  return converter;
};
