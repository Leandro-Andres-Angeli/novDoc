import React, { useContext } from 'react';

import { AuthContext } from '../appContext/AuthContext';
import AppLoading from '../ui/AppLoading';
import PublicNavigator from './publicNavigator/PublicNavigator';
import useOnAuthStateChangeListener from '../hooks/useOnAuthStateChangeListener';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/config';
import PrivateNavigator from './privateNavigator/PrivateNavigator';

function MainNavigator() {
  const {
    loading,
    authState: { logged },
  } = useContext(AuthContext);

  useOnAuthStateChangeListener();
  if (loading) {
    return <AppLoading></AppLoading>;
  }
  let content = <PrivateNavigator></PrivateNavigator>;
  if (!logged) {
    content = <PublicNavigator></PublicNavigator>;
  }
  return (
    <>
      <Button onPress={() => signOut(auth)} title='signout'></Button>
      {content}
    </>
  );
}
export default MainNavigator;
