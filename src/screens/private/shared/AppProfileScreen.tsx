import { View, Text } from 'react-native';
import React, { PropsWithChildren, useContext } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import utilityStyles from 'src/styles/utilityStyles';
import AppAvatarCard from '@components/shared/AppAvatarCard';
interface AppProfileScreenProps extends PropsWithChildren {}
const AppProfileScreen = (props: AppProfileScreenProps) => {
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
        {props.children}
        {/* <JobsListTabNavigator></JobsListTabNavigator> */}
      </View>
    </View>
  );
};

export default AppProfileScreen;
