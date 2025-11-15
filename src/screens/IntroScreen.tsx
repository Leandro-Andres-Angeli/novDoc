import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlexStyle, AppState } from 'react-native';

import { AuthContext } from '../appContext/AuthContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

import WelcomeComponent from '../components/Welcome';

const IntroScreen = () => {
  const { login, authState, logout } = useContext(AuthContext);
  const coll = collection(db, 'test');
  const q = query(coll);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('is empty');
      }
      querySnapshot.forEach((doc) => {
        console.log('doc', doc.data());
      });
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  let { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const handleScreenOrientation = (
    screenWidth: number,
    screenHeight: number
  ) => {
    return screenWidth < screenHeight ? 'portrait' : 'landscape';
  };

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    handleScreenOrientation(screenWidth, screenHeight)
  );

  useEffect(() => {
    const DimensionsChangeSubs = Dimensions.addEventListener(
      'change',
      function () {
        screenHeight = Dimensions.get('screen').height;
        screenWidth = Dimensions.get('screen').width;
        setOrientation(handleScreenOrientation(screenWidth, screenHeight));
      }
    );
    const appStateSubs = AppState.addEventListener(
      'change',
      function (appState) {
        if (appState === 'active') {
          screenHeight = Dimensions.get('screen').height;
          screenWidth = Dimensions.get('screen').width;
          setOrientation(handleScreenOrientation(screenWidth, screenHeight));
        }
      }
    );
    return () => {
      DimensionsChangeSubs.remove();
      appStateSubs.remove();
    };
  }, []);

  //PORTRAIT
  return (
    <WelcomeComponent
      isLandscape={orientation === 'landscape'}
      width={screenWidth}
    ></WelcomeComponent>
  );
};
export default IntroScreen;
