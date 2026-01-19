import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import EditProfileForm from '@components/forms/EditProfileForm';
import { UpdateRecruiterProfileFormShape } from 'src/types/FormProps';

import { updateProfile } from 'src/services/profile/profile.service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Toast } from 'toastify-react-native';
import { recruiterProfileDrawerRootStack } from '../recruiter/RecruiterProfileDrawer';
import { FormikHelpers } from 'formik';
interface EditProfileScreenProps extends NativeStackScreenProps<
  typeof recruiterProfileDrawerRootStack
> {}
const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    return <></>;
  }

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: UpdateRecruiterProfileFormShape) => {
    // console.log('submittt');
    setLoading(true);
    try {
      // await new Promise((res, rej) => res(true));
      const updatedProfileOp = await updateProfile(user.id, values);
      if (updatedProfileOp.success) {
        Toast.show({
          onHide() {
            navigation.navigate('PROFILE_STACK');
          },
          text1: updatedProfileOp.message,
          visibilityTime: 700,
          autoHide: true,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={{ ...utilityStyles.flex }}>
        <EditProfileForm
          handleSubmit={handleSubmit}
          loading={loading}
          user={user}
        ></EditProfileForm>
      </View>
    </>
  );
};

export default EditProfileScreen;
