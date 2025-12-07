import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import JobPostingForm from '@components/forms/JobPostingForm';
import { IJobOffer } from 'src/types/dbTypes/IJobOffer';
import { FormikHelpers } from 'formik';
import { AuthContext } from 'src/appContext/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecruiterProfileStackRootParams } from './RecruiterProfileStack';
interface EditJobPostingScreen
  extends NativeStackScreenProps<
    RecruiterProfileStackRootParams,
    'EDIT_JOB_POSTING'
  > {}
const EditJobPostingScreen = ({
  route: {
    params: { jobPosting },
  },
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

    return;
    try {
      const newJobOfferResponse = await createJobOffer(values);
      console.log(newJobOfferResponse);
      if (newJobOfferResponse.success) {
        Toast.show({
          onHide: () => {
            navigator.navigate(RECRUITER_NAVIGATOR_ROUTES.PROFILE, {});
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
    ></JobPostingForm>
  );
  //return (

  // <View>
  //   <Text>EditJobPostingScreen</Text>
  // </View>
  //  );
};

export default EditJobPostingScreen;
