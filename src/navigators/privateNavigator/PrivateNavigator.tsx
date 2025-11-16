import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from 'src/appContext/AuthContext';
import { getUserTypeByRole, isProfessional } from 'src/utils/checkUserType';
import AppLoading from '@ui/AppLoading';
import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import { Role } from 'src/types/authContextTypes/userRole';
import utilityStyles from 'src/styles/utilityStyles';
import RecruiterNavigator from './RecruiterNavigator';
import ProfessionalNavigator from './ProfessionalNavigator';
const NavigatorByRole = () => {
  const {
    authState: { user, logged },
  } = useContext(AuthContext);
  if (!logged) {
    return;
  }
  switch (user.role) {
    case Role.PROFESSIONAL:
      return <ProfessionalNavigator></ProfessionalNavigator>;

    case Role.RECRUITER:
      return <RecruiterNavigator></RecruiterNavigator>;

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
  if (loading) {
    <AppLoading></AppLoading>;
  }
  if (!user) {
    return (
      <View>
        <Text>No user</Text>
      </View>
    );
  }

  return <NavigatorByRole></NavigatorByRole>;
};

export default PrivateNavigator;
