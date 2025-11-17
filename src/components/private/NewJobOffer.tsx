import { View, Text } from 'react-native';
import React, { useState } from 'react';
import {
  IJobOffer,
  JobLocation,
  Senority,
  ShiftTime,
} from 'src/types/dbTypes/IJobOffer';
import * as Yup from 'yup';
import { Toast } from 'toastify-react-native';
import AppForm from '../form/AppForm';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { AppFormInputWithHelper } from '@ui/AppFormInputs';
import AppSegmentedButtons from '../AppSegmentedButtons';

const NewJobOffer = () => {
  const jobOfferForm: Pick<IJobOffer, 'title' | 'description' | 'jobLocation'> =
    {
      title: '',
      description: '',
      jobLocation: JobLocation.REMOTE,
      // salary: 0,
      // senority: Senority.JUNIOR,
      // shiftTime: ShiftTime.PART_TIME,
      // skills: [],
    };

  const formValidationSchema = Yup.object({
    title: Yup.string().required('campo obligatorio'),
    description: Yup.string().required('campo obligatorio'),
    jobLocation: Yup.string<JobLocation>().required(),

    // salary: Yup.number()
    //   .min(200, 'No puede ser menor a 200$')
    //   .required('campo obligatorio'),
    // seniority: Yup.string<Senority>().required('campo obligatorio'),
    // shiftTime: Yup.string<ShiftTime>().required('campo obligatorio'),
    // skills: Yup.array()
    //   .of(Yup.string())
    //   .required()
    //   .min(1, 'elegir al menos una skill'),
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: IJobOffer) {
    setLoading(true);
    try {
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  const theme = useTheme();

  return (
    <View
      style={{
        ...utilityStyles.contentContainer,
        ...utilityStyles.flex,
        marginTop: 20,
      }}
    >
      <AppForm<Pick<IJobOffer, 'title' | 'description' | 'jobLocation'>>
        handleSubmit={handleSubmit}
        loadingPostIndicator={loading}
        validationSchema={formValidationSchema}
        formFields={jobOfferForm}
      >
        {({
          handleInputValue,
          handleTextInputBlur,
          setFieldTouched,
          handleChange,
          values,
          touched,
          errors,
          dirty,
          isValid,
          handleBlur,
          handleSubmit,
          loadingPostIndicator,
        }) => {
          return (
            <View
              style={[
                utilityStyles.container,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <KeyboardAwareScrollView>
                <View style={utilityStyles.contentContainer}>
                  <View style={utilityStyles.inputsContainer}>
                    <AppFormInputWithHelper<IJobOffer>
                      formKey='title'
                      value={values.title}
                      placeholder='Título de la oferta '
                      key={'title'}
                      label='Título'
                      onBlur={() => handleTextInputBlur('title')}
                      onFocus={() => setFieldTouched('title', true)}
                      onChangeText={handleChange('title')}
                      keyboardType='ascii-capable'
                      errorCondition={
                        Boolean(touched.title && errors.title) || false
                      }
                      errorMessage={errors.title ?? ''}
                    ></AppFormInputWithHelper>
                  </View>
                  <View style={utilityStyles.inputsContainer}>
                    <AppFormInputWithHelper<IJobOffer>
                      formKey='description'
                      value={values.description}
                      placeholder='Descripción de la oferta '
                      key={'description'}
                      label='Descripción'
                      multiline={true}
                      numberOfLines={4}
                      style={{ minHeight: 100 }}
                      onBlur={() => handleTextInputBlur('description')}
                      onFocus={() => setFieldTouched('description', true)}
                      onChangeText={handleChange('description')}
                      keyboardType='ascii-capable'
                      errorCondition={
                        Boolean(touched.description && errors.description) ||
                        false
                      }
                      errorMessage={errors.title ?? ''}
                    ></AppFormInputWithHelper>
                  </View>
                  <View style={utilityStyles.inputsContainer}>
                    <AppSegmentedButtons
                      defaultValue={JobLocation.REMOTE}
                      values={[
                        {
                          value: JobLocation.HYBRID,
                          label: JobLocation.HYBRID,
                        },
                        {
                          value: JobLocation.ON_SITE,
                          label: JobLocation.ON_SITE,
                        },
                        {
                          value: JobLocation.REMOTE,
                          label: JobLocation.REMOTE,
                        },
                      ]}
                      handleChange={(val: JobLocation) =>
                        handleInputValue('jobLocation', val)
                      }
                    ></AppSegmentedButtons>
                    {/* <AppFormInputWithHelper<IJobOffer>
                      formKey='description'
                      value={values.description}
                      placeholder='Descripción de la oferta '
                      key={'description'}
                      label='Descripción'
                      multiline={true}
                      numberOfLines={4}
                      style={{ minHeight: 100 }}
                      onBlur={() => handleTextInputBlur('description')}
                      onFocus={() => setFieldTouched('description', true)}
                      onChangeText={handleChange('description')}
                      keyboardType='ascii-capable'
                      errorCondition={
                        Boolean(touched.description && errors.description) ||
                        false
                      }
                      errorMessage={errors.title ?? ''}
                    ></AppFormInputWithHelper> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View
                style={[
                  utilityStyles.fabContainer,
                  {
                    backgroundColor: theme.colors.background,
                  },
                ]}
              >
                {!loadingPostIndicator && (
                  <Button
                    mode='contained'
                    style={utilityStyles.fab}
                    contentStyle={utilityStyles.fabContent}
                    labelStyle={utilityStyles.fabLabel}
                    onPress={() => handleSubmit()}
                    disabled={(dirty && !isValid) || !dirty}
                  >
                    Crear oferta
                  </Button>
                )}
                {loadingPostIndicator && (
                  <ActivityIndicator
                    color={theme.colors.primary}
                    size={'small'}
                  ></ActivityIndicator>
                )}
              </View>
            </View>
          );
        }}
      </AppForm>
    </View>
  );
};

export default NewJobOffer;
