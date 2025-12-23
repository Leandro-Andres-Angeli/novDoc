import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { userConverter } from '@utils/converters/firebaseConverters';
import { db } from 'firebase/config';
import { AuthContext } from 'src/appContext/authContext/AuthContext';

const useSubscribeToLoggedUserUpdate = () => {
  const usersCollection = collection(db, 'users').withConverter(userConverter);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const loggedUser = user!;
  useEffect(() => {
    const q = query(usersCollection, where('id', '==', loggedUser.id));
    const onUserUpdateDataSubscription = onSnapshot(
      q,
      { includeMetadataChanges: true },
      function () {
        console.log('UPDATED USER');
        console.log('UPDATED USER ARGS', arguments);
      },
      (err) => {
        console.log('error user updates listener');
      }
    );

    return onUserUpdateDataSubscription;
  }, []);
};

export default useSubscribeToLoggedUserUpdate;
