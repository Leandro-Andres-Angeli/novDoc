import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from 'src/appContext/AuthContext';
import { isProfessional } from 'src/utils/checkUserType';
import AppLoading from '@ui/AppLoading';

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
  const userIsProfessional = isProfessional(user);

  if (userIsProfessional) {
    return (
      <View>
        <Text>Professional routes</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>PrivateNavigator</Text>
    </View>
  );
};

export default PrivateNavigator;
