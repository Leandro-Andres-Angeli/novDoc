import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';

import AppLoading from '@ui/AppLoading';

import { Role } from 'src/types/authContextTypes/userRole';
import utilityStyles from 'src/styles/utilityStyles';
import RecruiterNavigator from './recruiterNavigator/RecruiterNavigator';
import ProfessionalNavigator from './ProfessionalNavigator';
import { RecruiterContextProvider } from 'src/appContext/recruiterContext/RecruiterContext';
import useSubscribeToLoggedUserUpdate from 'src/hooks/useSubscribeToLoggedUserUpdate';
import { ProfessionalContextProvider } from 'src/appContext/professionalContext/ProfessionalContext';

const NavigatorByRole = () => {
  const {
    authState: { user, logged },
  } = useContext(AuthContext);
  if (!logged) {
    return;
  }
  switch (user.role) {
    case Role.PROFESSIONAL:
      return (
        <ProfessionalContextProvider>
          <ProfessionalNavigator></ProfessionalNavigator>
        </ProfessionalContextProvider>
      );

    case Role.RECRUITER:
      return (
        <RecruiterContextProvider>
          <RecruiterNavigator></RecruiterNavigator>
        </RecruiterContextProvider>
      );

    default:
      return (
        <View style={{ ...utilityStyles.flex }}>
          <Text> Not Valid Role </Text>
        </View>
      );
  }
};
const PrivateNavigator = () => {
  const {
    authState: { user },
    loading,
  } = useContext(AuthContext);
  useSubscribeToLoggedUserUpdate();
  if (loading) {
    return <AppLoading></AppLoading>;
  }
  if (!user) {
    return <></>;
  }

  return <NavigatorByRole></NavigatorByRole>;
};

export default PrivateNavigator;
