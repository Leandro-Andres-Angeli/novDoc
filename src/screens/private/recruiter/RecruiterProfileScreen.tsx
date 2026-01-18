import { View } from 'react-native';
import React, { useContext } from 'react';
import utilityStyles from 'src/styles/utilityStyles';

import { AuthContext } from 'src/appContext/authContext/AuthContext';

import JobsListTabNavigator from '../../../navigators/privateNavigator/recruiterNavigator/JobsListTabNavigator';
import AppAvatarCard from '@components/shared/AppAvatarCard';
import { useRoute } from '@react-navigation/native';

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
      <View style={[utilityStyles.contentContainer, utilityStyles.flex]}>
        <JobsListTabNavigator></JobsListTabNavigator>
      </View>
    </View>
  );
};

export default RecruiterProfileScreen;
