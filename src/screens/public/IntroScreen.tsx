import React, { useEffect, useState } from 'react';
import { Dimensions, AppState } from 'react-native';

import WelcomeComponent from 'src/components/Welcome';
import useSubscribeToAppStateChange from 'src/hooks/useSubscribeToAppStateChange';

const IntroScreen = () => {
  let { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const handleScreenOrientation = (
    screenWidth: number,
    screenHeight: number,
  ) => {
    return screenWidth < screenHeight ? 'portrait' : 'landscape';
  };

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    handleScreenOrientation(screenWidth, screenHeight),
  );

  useEffect(() => {
    const DimensionsChangeSubs = Dimensions.addEventListener(
      'change',
      function () {
        screenHeight = Dimensions.get('screen').height;
        screenWidth = Dimensions.get('screen').width;
        setOrientation(handleScreenOrientation(screenWidth, screenHeight));
      },
    );
    // const appStateSubs = AppState.addEventListener('blur', function (appState) {
    // if (appState === 'active') {
    //   screenHeight = Dimensions.get('screen').height;
    //   screenWidth = Dimensions.get('screen').width;
    //   setOrientation(handleScreenOrientation(screenWidth, screenHeight));
    // }
    // });
    return () => {
      DimensionsChangeSubs.remove();
      // appStateSubs.remove();
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
