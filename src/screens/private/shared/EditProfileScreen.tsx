import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';
import EditProfileForm from '@components/forms/EditProfileForm';

const EditProfileScreen = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    return <></>;
  }
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(() => true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  return (
    <View style={{ ...utilityStyles.flex }}>
      <EditProfileForm
        handleSubmit={handleSubmit}
        loading={loading}
        user={user}
      ></EditProfileForm>
    </View>
  );
};

export default EditProfileScreen;
