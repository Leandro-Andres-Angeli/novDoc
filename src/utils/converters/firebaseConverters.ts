import { getUserTypeByRole } from '@utils/checkUserType';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
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
