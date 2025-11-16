import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'firebase/config';
import { AuthContext } from 'src/appContext/AuthContext';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { IUser } from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';

const useOnAuthStateChangeListener = () => {
  const { login, logout } = useContext(AuthContext);
  const usersCollection = collection(db, 'users');
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
              const userData = doc.data() as IUser;
              login(userData);
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
