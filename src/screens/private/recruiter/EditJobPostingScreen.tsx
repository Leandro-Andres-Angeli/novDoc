import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import JobPostingForm from '@components/forms/JobPostingForm';

import { FormikHelpers } from 'formik';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecruiterProfileStackRootParams } from './RecruiterProfileStack';

import { Toast } from 'toastify-react-native';
import { formModes } from 'src/types/formMode';
import AppLoading from '@ui/AppLoading';
import { Timestamp } from 'firebase/firestore';
import { IJobPosting } from 'src/types/dbTypes/IJobOffer';
import { updatejobPosting } from 'src/services/jobOffer/jobOffer.service';
interface EditJobPostingScreen
  extends NativeStackScreenProps<
    RecruiterProfileStackRootParams,
    'EDIT_JOB_POSTING'
  > {}
const EditJobPostingScreen = ({
  route: {
    params: { jobPosting },
  },
  navigation,
}: EditJobPostingScreen) => {
  const [loading, setLoading] = useState(false);
  const {
    authState: { user },
    loading: loadingUser,
  } = useContext(AuthContext);

  async function handleSubmit(
    values: IJobPosting,
    helpers: FormikHelpers<any>
  ) {
    setLoading(true);
    console.log(values);

    try {
      const newjobPostingResponse = await updatejobPosting(jobPosting.id, {
        ...values,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      console.log(newjobPostingResponse);
      if (newjobPostingResponse.success) {
        Toast.show({
          onHide: () => {
            navigation.navigate('RECRUITER_PROFILE_TABS', {});
          },
          text1: newjobPostingResponse.message,
          visibilityTime: 700,
          autoHide: true,
        });
        helpers.resetForm();
        return;
      } else Toast.error(newjobPostingResponse.message);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  if (!user) {
    return (
      <View>
        <Text>Error buscando usuario</Text>
      </View>
    );
  }
  if (loadingUser) {
    return <AppLoading></AppLoading>;
  }
  return (
    <JobPostingForm<IJobPosting>
      loading={loading}
      handleSubmit={handleSubmit}
      userId={user.id}
      valuesToEdit={jobPosting}
      submitTextBtn='Actualizar Oferta'
      mode={formModes.EDIT}
    ></JobPostingForm>
  );
};

export default EditJobPostingScreen;
