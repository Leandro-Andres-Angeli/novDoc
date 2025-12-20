import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../appContext/AuthContext';
import AppLoading from '../ui/AppLoading';
import PublicNavigator from './publicNavigator/PublicNavigator';
import useOnAuthStateChangeListener from '../hooks/useOnAuthStateChangeListener';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/config';
import PrivateNavigator from './privateNavigator/PrivateNavigator';
import { Text } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

function MainNavigator() {
  const {
    loading,
    authState: { logged, user },
  } = useContext(AuthContext);

  useOnAuthStateChangeListener();
  // useEffect(() => {
  //   if (loading) {
  //     SplashScreen.preventAutoHideAsync();
  //   } else {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loading]);

  if (loading) {
    console.log('here loading');
    return <AppLoading></AppLoading>;
  }
  let content = <PrivateNavigator></PrivateNavigator>;
  if (!user && !loading) {
    content = <PublicNavigator></PublicNavigator>;
  }
  return (
    <>
      <Text> {JSON.stringify(loading)}</Text>
      {content}
    </>
  );
}
export default MainNavigator;
