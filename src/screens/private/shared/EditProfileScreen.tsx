import { View } from 'react-native';
import React, { useContext } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import EditProfileForm from '@components/forms/EditProfileForm';

import { ProfilePhotoContextProvider } from 'src/appContext/photoContext/ProfilePhotoContext';

const EditProfileScreen = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    return <></>;
  }

  return (
    <ProfilePhotoContextProvider>
      <View style={{ ...utilityStyles.flex }}>
        <EditProfileForm user={user}></EditProfileForm>
      </View>
    </ProfilePhotoContextProvider>
  );
};

export default EditProfileScreen;
