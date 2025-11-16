import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'firebase/config';
import { AuthContext } from 'src/appContext/AuthContext';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

import { userConverter } from '@utils/converters/firebaseConverters';

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
          if (querySnapshot.empty) {
            console.error('No user document found for this auth user!');
            logout();
            return;
          }
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (doc.exists()) {
              const userData = doc.data();
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
