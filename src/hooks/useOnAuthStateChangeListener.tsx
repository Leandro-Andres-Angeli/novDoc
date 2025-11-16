import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase/config';

const useOnAuthStateChangeListener = () => {
  useEffect(() => {
    const onAuthStateSubscription = onAuthStateChanged(
      auth,
      function () {
        console.log('auth state changed');
        console.log('auth state changed arg', arguments);
      },
      function () {
        console.log('AUTH ERROR');
        console.log(arguments);
      }
    );
    return onAuthStateSubscription;
  }, []);
};

export default useOnAuthStateChangeListener;
