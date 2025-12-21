import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';
import EditProfile from '../../../components/shared/EditProfile';

const EditProfileScreen = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  return (
    <View style={{ ...utilityStyles.flex }}>
      <EditProfile></EditProfile>
    </View>
  );
};

export default EditProfileScreen;
