import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'firebase/config';
import { AuthContext } from 'src/appContext/AuthContext';
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
import {
  IRecruiter,
  IUser,
  UserTypes,
} from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';
import { IProfessional } from '../types/authContextTypes/authContextTypes';
import { isProfessional, isRecruiter } from 'src/utils/checkUserType';

type RoleToUserMap = {
  [Role.PROFESSIONAL]: IProfessional;
  [Role.RECRUITER]: IRecruiter;
};
type UserTypeFor<R extends Role> = RoleToUserMap[R];
const userConverter = {
  toFirestore: (user: IUser & Record<string, any>) => {
    return user;
  },
  fromFirestore: <R extends Role>(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined
  ): UserTypeFor<R> => {
    const data = snapshot.data(options) as IUser;
    const baseUser: IUser = {
      ...data,
    };

    if (baseUser.role === Role.PROFESSIONAL) {
      return {
        ...baseUser,
      } as UserTypeFor<R>;
    }

    if (baseUser.role === Role.RECRUITER) {
      return {
        ...baseUser,
      } as UserTypeFor<R>;
    }

    throw new Error(`Unknown role: ${baseUser.role}`);
  },
};
const useOnAuthStateChangeListener = () => {
  const { login, logout } = useContext(AuthContext);
  const usersCollection = collection(db, 'users').withConverter(userConverter);
  useEffect(() => {
    const onAuthStateSubscription = onAuthStateChanged(
      auth,
      async function (user) {
        if (user) {
          const q = query(
            usersCollection,
            where('id', '==', user.uid),
            limit(1)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (doc.exists()) {
              const userData = doc.data();
              if (isRecruiter(userData)) {
                login(userData);
              }
              if (isProfessional(userData)) {
                login(userData);
              } else throw Error('Not valid role found ');
            }
          });
        } else {
          logout();
        }
      }
    );
    return onAuthStateSubscription;
  }, []);
};

export default useOnAuthStateChangeListener;
