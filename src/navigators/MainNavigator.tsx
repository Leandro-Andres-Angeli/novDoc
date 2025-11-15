import React, { useContext } from 'react';

import { AuthContext } from '../appContext/AuthContext';
import AppLoading from '../ui/AppLoading';
import PublicNavigator from './publicNavigator/PublicNavigator';

function MainNavigator() {
  const {
    authState: { logged },
  } = useContext(AuthContext);
  // return <Loading></Loading>;
  if (!logged) {
    return <PublicNavigator></PublicNavigator>;
  }
  return <AppLoading></AppLoading>;
}
export default MainNavigator;
