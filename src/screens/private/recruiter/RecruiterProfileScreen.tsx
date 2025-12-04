import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppAvatarCard from '../../../components/shared/AppAvatarCard';
import { AuthContext } from 'src/appContext/AuthContext';
import { JobOfferStatus } from 'src/types/dbTypes/IJobOffer';
import JobsListTabNavigator from '../../../navigators/privateNavigator/recruiterNavigator/JobsListTabNavigator';

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
