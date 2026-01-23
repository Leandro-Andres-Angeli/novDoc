import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useSubscribeToAppStateChange = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = async function (
    currentAppState: AppStateStatus,
  ) {
    // Check if the app is coming from inactive/background to active
    // if (currentAppState === 'active') {
    //   console.log(
    //     'App has returned to the foreground, re-checking permissions...',
    //   );
    // }
    setAppState(currentAppState);
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);
  return { appState };
};

export default useSubscribeToAppStateChange;
