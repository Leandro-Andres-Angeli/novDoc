import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { userConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
const usersCollection = collection(db, 'users').withConverter(userConverter);
const useSubscribeToLoggedUserUpdate = () => {
  const {
    authState: { user },
    updateUserData,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log('inside effect');
    if (!user?.id) {
      return;
    }
    const q = query(usersCollection, where('id', '==', user.id));
    const onUserUpdateDataSubscription = onSnapshot(
      q,

      function ({ docs }) {
        docs.forEach((doc) => {
          updateUserData(doc.data());
        });
      },
      (err) => {
        console.log('error user updates listener');
      }
    );

    return onUserUpdateDataSubscription;
  }, [user?.id]);
};

export default useSubscribeToLoggedUserUpdate;
