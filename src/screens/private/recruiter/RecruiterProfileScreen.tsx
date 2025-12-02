import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppAvatarCard from '../../../components/shared/AppAvatarCard';
import { AuthContext } from 'src/appContext/AuthContext';

const RecruiterProfileScreen = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  return (
    <View style={[utilityStyles.container]}>
      <AppAvatarCard
        avatarPic='test'
        fullName={`${user?.name} ${user?.lastName}`}
      ></AppAvatarCard>
    </View>
  );
};

export default RecruiterProfileScreen;
