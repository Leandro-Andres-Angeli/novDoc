import { View } from 'react-native';
import React, { useContext, useState } from 'react';

import { Toast } from 'toastify-react-native';

import { Text } from 'react-native-paper';

import { AuthContext } from 'src/appContext/authContext/AuthContext';
import AppLoading from '@ui/AppLoading';

import AppLocationSelected from '@ui/AppLocationSelected';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import { FormikHelpers } from 'formik';

import JobPostingForm from '@components/forms/JobPostingForm';

import { createjobPosting } from 'src/services/jobOffer/jobOffer.service';
import { IJobPosting } from 'src/types/dbTypes/IJobOffer';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';

const NewJobOffer = () => {
  const {
    authState: { user },
    loading: loadingUser,
  } = useContext(AuthContext);
  const { addLocalJob } = useContext(RecruiterContext);
  if (loadingUser) {
    return <AppLoading></AppLoading>;
  }
  if (!user) {
    return (
      <View>
        <Text>Error buscando usuario</Text>
      </View>
    );
  }

  const [loading, setLoading] = useState(false);

  const navigator =
    useNavigation<
      NavigationProp<RecruiterNavigatorRootParams & ParamListBase>
    >();
  /* const navigator =
    useNavigation<NavigationProp<RecruiterNavigatorRootParams>>(); */
  async function handleSubmit(
    values: IJobPosting,
    helpers: FormikHelpers<any>
  ) {
    setLoading(true);

    try {
      const newJobOfferResponse = await createjobPosting(values);

      if (newJobOfferResponse.success) {
        addLocalJob(newJobOfferResponse.data);
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

  return (
    <JobPostingForm<IJobPosting>
      loading={loading}
      handleSubmit={handleSubmit}
      userId={user.id}
    ></JobPostingForm>
  );
};

export default NewJobOffer;
