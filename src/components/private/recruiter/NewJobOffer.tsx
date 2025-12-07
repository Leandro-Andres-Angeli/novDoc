import { View } from 'react-native';
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IJobOffer,
  IJobOfferGeneral,
  IJobOfferHybrid,
  IJobOfferOnSite,
  IJobOfferRemote,
  JobLocation,
  JobOfferStatus,
  Seniority,
  ShiftTime,
} from 'src/types/dbTypes/IJobOffer';
import * as Yup from 'yup';
import { Toast } from 'toastify-react-native';

import {
  ActivityIndicator,
  Button,
  Chip,
  Text,
  useTheme,
} from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';
import { AppFormInputWithHelper, InputHelper } from '@ui/AppFormInputs';

import { ISkill, skillsLists } from 'src/types/dbTypes/ISkills';

import { AuthContext } from 'src/appContext/AuthContext';
import AppLoading from '@ui/AppLoading';
import { createJobOffer } from 'src/services/jobOffer/jobOffer.service';
import AppLocationSelected from '@ui/AppLocationSelected';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import { FormikHelpers } from 'formik';

import JobPostingForm from '@components/forms/JobPostingForm';

const NewJobOffer = () => {
  const {
    authState: { user },
    loading: loadingUser,
  } = useContext(AuthContext);
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
    useNavigation<NavigationProp<RecruiterNavigatorRootParams>>();
  async function handleSubmit(values: IJobOffer, helpers: FormikHelpers<any>) {
    setLoading(true);
    console.log(values);

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

  return (
    <JobPostingForm<IJobOffer>
      loading={loading}
      handleSubmit={handleSubmit}
      userId={user.id}
    ></JobPostingForm>
  );
};

export default NewJobOffer;
