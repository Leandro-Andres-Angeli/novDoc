import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import JobPostingForm from '@components/forms/JobPostingForm';
import { IJobOffer } from 'src/types/dbTypes/IJobOffer';
import { FormikHelpers } from 'formik';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecruiterProfileStackRootParams } from './RecruiterProfileStack';
import { updateJobOffer } from '../../../services/jobOffer/jobOffer.service';
import { Toast } from 'toastify-react-native';
import { formModes } from 'src/types/formMode';
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
  const { id, ...rest } = jobPosting;
  async function handleSubmit(values: IJobOffer, helpers: FormikHelpers<any>) {
    setLoading(true);
    console.log(values);

    try {
      const newJobOfferResponse = await updateJobOffer(id, values);
      console.log(newJobOfferResponse);
      if (newJobOfferResponse.success) {
        Toast.show({
          onHide: () => {
            navigation.navigate('RECRUITER_PROFILE_TABS', {});
          },
          text1: newJobOfferResponse.message,
          visibilityTime: 700,
          autoHide: true,
        });
        helpers.resetForm();
        return;
      } else Toast.error(newJobOfferResponse.message);
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

  return (
    <JobPostingForm<IJobOffer>
      loading={loading}
      handleSubmit={handleSubmit}
      userId={user.id}
      valuesToEdit={rest}
      submitTextBtn='Actualizar Oferta'
      mode={formModes.EDIT}
    ></JobPostingForm>
  );
};

export default EditJobPostingScreen;
