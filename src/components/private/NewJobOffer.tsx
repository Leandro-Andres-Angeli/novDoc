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
  Seniority,
  ShiftTime,
} from 'src/types/dbTypes/IJobOffer';
import * as Yup from 'yup';
import { Toast } from 'toastify-react-native';
import AppForm from '../form/AppForm';
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
import { AppFormInputWithHelper } from '@ui/AppFormInputs';
import AppSegmentedButtons from '../AppSegmentedButtons';

import { AppReactNativePaperSelectMultiple } from '../../ui/AppReactNativePaperSelect';

import AppSubtitle from '../../ui/AppSubtitle';
import { ISkill, skillsLists } from 'src/types/dbTypes/ISkills';
import { InputHelper } from '../../ui/AppFormInputs';

import LocationPicker from '../shared/LocationPicker';
import GeoLocationPicker from '../shared/GeoLocationPicker';
import { AuthContext } from 'src/appContext/AuthContext';
import AppLoading from '@ui/AppLoading';
import { createJobOffer } from 'src/services/jobOffer/jobOffer.service';
import AppLocationSelected from '@ui/AppLocationSelected';
import AppMap from '../shared/AppMap';

import AppTypeOfLocationSelection, {
  LocationSelectionType,
} from '../shared/AppTypeOfLocationSelection';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RecruiterNavigatorRootParams } from 'src/navigators/privateNavigator/recruiterNavigator/RecruiterNavigator';
import RECRUITER_NAVIGATOR_ROUTES from 'src/navigators/privateNavigator/recruiterNavigator/RECRUITER_NAVIGATOR_ROUTES';
import { FormikHelpers } from 'formik';

const NewJobOffer = () => {
  const { isVisible } = useKeyboardState();
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
  const generateJobOfferForm = (jobLocation: JobLocation) => {
    const base: IJobOfferGeneral = {
      title: '',
      company: '',
      recruiter_id: user.id,
      description: '',
      jobLocation: JobLocation.REMOTE,
      seniority: Seniority.JUNIOR,
      salary: 0,
      shiftTime: ShiftTime.FULL_TIME,
      skills: [],
    };
    switch (jobLocation) {
      case JobLocation.ON_SITE:
        const JobOfferOnSite: IJobOfferOnSite = {
          ...base,
          city: '',
          jobLocation: JobLocation.ON_SITE,

          province: '',
        };
        return JobOfferOnSite;

      case JobLocation.HYBRID:
        const JobOfferHybrid: IJobOfferHybrid = {
          ...base,
          city: '',
          jobLocation: JobLocation.HYBRID,

          province: '',
        };
        return JobOfferHybrid;

      case JobLocation.REMOTE:
        const JobOfferRemote: IJobOfferRemote = {
          ...base,

          jobLocation: JobLocation.REMOTE,
        };
        return JobOfferRemote;
      default:
        return base as IJobOfferRemote;
    }
  };

  const generateJobOfferValidationSchema = () => {
    const baseValidationSchema = Yup.object<IJobOffer>({
      title: Yup.string().required('campo obligatorio'),
      description: Yup.string().required('campo obligatorio'),
      company: Yup.string().required('campo obligatorio'),
      salary: Yup.number()
        .min(200, 'No puede ser menor a 200$')
        .required('campo obligatorio'),
      seniority: Yup.string<Seniority>().required('campo obligatorio'),
      shiftTime: Yup.string<ShiftTime>().required('campo obligatorio'),
      jobLocation: Yup.string<JobLocation>()
        .required('campo obligatorio')
        .oneOf([JobLocation.HYBRID, JobLocation.ON_SITE, JobLocation.REMOTE]),

      skills: Yup.array<ISkill>()
        .default([])
        .min(1, 'elegir al menos una skill')
        .required(),
      city: Yup.string().when('jobLocation', {
        is: (val: string) =>
          val === JobLocation.HYBRID || val === JobLocation.ON_SITE,
        then(schema) {
          return schema.required('campo obligatorio');
        },
        otherwise(schema) {
          return schema.notRequired();
        },
      }),
      province: Yup.string().when('jobLocation', {
        is: (val: string) =>
          val === JobLocation.HYBRID || val === JobLocation.ON_SITE,
        then(schema) {
          return schema.required('campo obligatorio');
        },
        otherwise(schema) {
          return schema.notRequired();
        },
      }),
    });
    return baseValidationSchema as unknown as Yup.ObjectSchema<IJobOffer>;
  };

  const jobOfferHasLocation = (
    jobOfferForm: IJobOfferOnSite | IJobOfferHybrid | IJobOfferRemote
  ): jobOfferForm is IJobOfferHybrid | IJobOfferOnSite => {
    return (
      jobOfferForm.jobLocation === JobLocation.ON_SITE ||
      jobOfferForm.jobLocation === JobLocation.HYBRID
    );
  };

  const [jobOfferForm, setJobOfferForm] = useState<IJobOffer>(
    generateJobOfferForm(JobLocation.REMOTE)
  );

  const jobOfferValidationSchema = useMemo(() => {
    return generateJobOfferValidationSchema();
  }, [jobOfferForm.jobLocation]);

  useEffect(() => {
    setJobOfferForm(generateJobOfferForm(jobOfferForm.jobLocation));
  }, [jobOfferForm.jobLocation]);

  const [loading, setLoading] = useState(false);
  const [loadingFormLocation, setLoadingFormLocation] = useState(false);
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
            navigator.navigate(RECRUITER_NAVIGATOR_ROUTES.SWIPE, {});
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
  const theme = useTheme();

  return (
    <View
      style={{
        ...utilityStyles.contentContainer,
        ...utilityStyles.flex,
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      <AppForm<IJobOffer>
        handleSubmit={handleSubmit}
        loadingPostIndicator={loading}
        validationSchema={jobOfferValidationSchema}
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

          handleSubmit,
          loadingPostIndicator,
          setFieldValue,

          setValues,
        }) => {
          return (
            <>
              <View
                style={[
                  {
                    backgroundColor: theme.colors.background,
                    overflow: 'scroll',
                  },
                ]}
              >
                <KeyboardAwareScrollView
                  style={{ marginBottom: 100 }}
                  disableScrollOnKeyboardHide
                  automaticallyAdjustContentInsets
                  automaticallyAdjustKeyboardInsets
                  automaticallyAdjustsScrollIndicatorInsets
                >
                  <View
                    style={{
                      paddingBottom: isVisible ? 10 : 'auto',
                    }}
                  >
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
                          formKey='company'
                          value={values.company}
                          placeholder='Empresa'
                          key={'company'}
                          label='Empresa'
                          onBlur={() => handleTextInputBlur('company')}
                          onFocus={() => setFieldTouched('company', true)}
                          onChangeText={handleChange('company')}
                          keyboardType='ascii-capable'
                          errorCondition={
                            Boolean(touched.company && errors.company) || false
                          }
                          errorMessage={errors.company ?? ''}
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
                            Boolean(
                              touched.description && errors.description
                            ) || false
                          }
                          errorMessage={errors.description ?? ''}
                        ></AppFormInputWithHelper>
                      </View>
                      <View style={utilityStyles.inputsContainer}>
                        <AppSubtitle textAlign='left'>Modalidad</AppSubtitle>
                        <AppSegmentedButtons
                          defaultValue={values.jobLocation}
                          value={values.jobLocation}
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
                          handleChange={(val: JobLocation) => {
                            handleInputValue('jobLocation', val);

                            setJobOfferForm(generateJobOfferForm(val));
                          }}
                        ></AppSegmentedButtons>
                        {jobOfferHasLocation(values) && (
                          <AppLocationSelected
                            loadingCondition={loadingFormLocation}
                          >
                            <>
                              <Text variant='labelMedium'>
                                Locación seleccionada
                              </Text>
                              <View style={utilityStyles.flex}>
                                <Chip>
                                  {values.province} {values.city}
                                </Chip>
                              </View>
                            </>
                          </AppLocationSelected>
                        )}
                        {jobOfferHasLocation(values) && (
                          <AppTypeOfLocationSelection>
                            {({ locationSelectionType }) => {
                              switch (locationSelectionType) {
                                case LocationSelectionType.SELECT_LIST:
                                  return (
                                    <View
                                      style={{
                                        ...utilityStyles.inputsContainer,
                                      }}
                                    >
                                      <LocationPicker
                                        handleSelectProvince={(val) => {
                                          setFieldValue('province', val);
                                        }}
                                        handleSelectCity={(val) => {
                                          setFieldValue('city', val);
                                        }}
                                      ></LocationPicker>
                                    </View>
                                  );
                                case LocationSelectionType.CURRENT_USER_LOCATION:
                                  return (
                                    <GeoLocationPicker
                                      handleLoading={(val: boolean) =>
                                        setLoadingFormLocation(val)
                                      }
                                      handleSelectProvince={(val) => {
                                        setFieldValue('province', val);
                                      }}
                                      handleSelectCity={(val) => {
                                        setLoadingFormLocation(true);
                                        setFieldValue('city', val);
                                      }}
                                    ></GeoLocationPicker>
                                  );
                                case LocationSelectionType.MAP:
                                  return (
                                    <View>
                                      <Text>Seleccionar en el mapa</Text>
                                      <AppMap
                                        mapStyles={{ height: 300 }}
                                        mapProps={{
                                          region: {
                                            latitude: -34.599553,
                                            longitude: -58.50361,
                                            latitudeDelta: 0.0922, // This determines the initial zoom
                                            longitudeDelta: 0.0421,
                                          },
                                          showsUserLocation: true,
                                          zoomEnabled: true,
                                          zoomControlEnabled: true,
                                          zoomTapEnabled: true,
                                        }}
                                        handleSelectMarker={(...args) => {
                                          console.log('args', args);
                                          const [city, region] = args;

                                          setFieldValue('province', region);
                                          setFieldValue('city', city);
                                        }}
                                      ></AppMap>
                                    </View>
                                  );
                              }
                            }}
                          </AppTypeOfLocationSelection>
                        )}
                        {/*        {jobOfferHasLocation(values) && (
                          <AppTypeOfLocationSelection>
                             {( { locationSelectionType } )=>  {
                             switch(locationSelectionType){
                              case LocationSelectionType.SELECT_LIST : 
                              return
                             }
                             }
                             
                             
                             }
                          </AppTypeOfLocationSelection>
                        )} */}

                        {/*   {jobOfferHasLocation(values) && (
                          <GeoLocationPicker
                            handleLoading={(val: boolean) =>
                              setLoadingFormLocation(val)
                            }
                            handleSelectProvince={(val) => {
                              setFieldValue('province', val);
                            }}
                            handleSelectCity={(val) => {
                              setLoadingFormLocation(true);
                              setFieldValue('city', val);
                            }}
                          ></GeoLocationPicker>
                        )} */}
                        {/*    {jobOfferHasLocation(values) ? (
                          <View>
                            <Text> O seleccionar en el mapa</Text>
                            <AppMap
                              mapStyles={{ height: 400 }}
                              mapProps={{
                                region: {
                                  latitude: -38.416097,
                                  longitude: -63.616672,
                                  longitudeDelta: 0.1,
                                  latitudeDelta: 0.1,
                                },
                                zoomEnabled: true,
                                zoomControlEnabled: true,
                                zoomTapEnabled: true,

                                onPress: () => {
                                  console.log('this', this);
                                },
                              }}
                            ></AppMap>
                          </View>
                        ) : (
                          <></>
                        )} */}
                        {/*   {jobOfferHasLocation(values) ? (
                          <View style={{ ...utilityStyles.inputsContainer }}>
                            <LocationPicker
                              handleSelectProvince={(val) => {
                                setFieldValue('province', val);
                              }}
                              handleSelectCity={(val) => {
                                setFieldValue('city', val);
                              }}
                            ></LocationPicker>
                          </View>
                        ) : (
                          <></>
                        )} */}
                        {/* testing data */}
                        {/* {jobOfferHasLocation(values) && (
                          <Text> {values.province}</Text>
                        )} */}
                        {/* testing data */}
                      </View>
                      <View style={{ ...utilityStyles.inputsContainer }}>
                        <AppSegmentedButtons
                          value={values.shiftTime}
                          defaultValue={values.shiftTime}
                          values={[
                            {
                              value: ShiftTime.PART_TIME,
                              label: ShiftTime.PART_TIME,
                            },
                            {
                              value: ShiftTime.FULL_TIME,
                              label: ShiftTime.FULL_TIME,
                            },
                            {
                              value: ShiftTime.CONTRACTOR,
                              label: ShiftTime.CONTRACTOR,
                            },
                          ]}
                          handleChange={(val: ShiftTime) => {
                            handleInputValue('shiftTime', val);
                          }}
                        ></AppSegmentedButtons>
                      </View>

                      <View
                        style={{
                          marginBottom: 16,
                        }}
                      >
                        <AppReactNativePaperSelectMultiple
                          handleSelectedListChange={(val) =>
                            setFieldValue(
                              'skills',
                              val.map((el) => ({ name: el.value }))
                            )
                          }
                          label='Skills'
                          selectedList={values.skills.map((el) => ({
                            _id: el.name,
                            value: el.name,
                          }))}
                          list={skillsLists.map((el) => ({
                            _id: el.name,

                            value: el.name,
                          }))}
                        >
                          <InputHelper
                            errorCondition={errors.skills !== undefined}
                            errorMessage={errors?.skills?.toString() ?? ''}
                          ></InputHelper>
                        </AppReactNativePaperSelectMultiple>
                      </View>

                      <View style={{ ...utilityStyles.inputsContainer }}>
                        <AppFormInputWithHelper<IJobOffer>
                          formKey='salary'
                          value={values.salary.toString()}
                          key={'salary'}
                          label='Salario'
                          multiline={true}
                          onBlur={() => handleTextInputBlur('salary')}
                          onFocus={() => setFieldTouched('salary', true)}
                          onChangeText={(e) => {
                            if (isNaN(Number(e))) {
                              return;
                            }

                            handleInputValue('salary', Number(e));
                          }}
                          keyboardType='decimal-pad'
                          errorCondition={
                            Boolean(touched.salary && errors.salary) || false
                          }
                          errorMessage={errors.salary ?? ''}
                        ></AppFormInputWithHelper>
                      </View>
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
            </>
          );
        }}
      </AppForm>
    </View>
  );
};

export default NewJobOffer;
