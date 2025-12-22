import { View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppForm from './AppForm';
import {
  IJobOffer,
  IJobOfferGeneral,
  IJobOfferHybrid,
  IJobOfferOnSite,
  IJobOfferRemote,
  JobLocation,
  JobOfferStatus,
  MapLocation,
  Seniority,
  ShiftTime,
} from 'src/types/dbTypes/IJobOffer';
import * as Yup from 'yup';
import { ISkill, skillsLists } from 'src/types/dbTypes/ISkills';
import { Timestamp } from 'firebase/firestore';
import {
  ActivityIndicator,
  Button,
  Chip,
  Text,
  useTheme,
} from 'react-native-paper';

import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';
import { AppFormInputWithHelper, InputHelper } from '@ui/AppFormInputs';
import AppSubtitle from '@ui/AppSubtitle';
import AppSegmentedButtons from '@components/AppSegmentedButtons';
import jobOfferHasLocation from '@utils/jobOfferHasLocation';
import AppLocationSelected from '@ui/AppLocationSelected';
import AppTypeOfLocationSelection, {
  LocationSelectionType,
} from '@components/shared/AppTypeOfLocationSelection';
import LocationPicker from '@components/shared/LocationPicker';
import GeoLocationPicker from '@components/shared/GeoLocationPicker';
import AppMap from '@components/shared/AppMap';
import AppReactNativePaperSelect, {
  AppReactNativePaperSelectMultiple,
} from '@ui/AppReactNativePaperSelect';
import { formModes } from 'src/types/formMode';
import { JobPostingFormProps } from 'src/types/FormProps';
import AppGenericSubmitBtn from './AppGenericSubmitBtn';

export const generateJobOfferForm = (
  jobLocation: JobLocation,
  userId: string,
  province?: MapLocation,
  city?: MapLocation
) => {
  const creationDate = Timestamp.fromDate(new Date());
  const base: IJobOfferGeneral = {
    title: '',
    company: '',
    recruiter_id: userId,
    description: '',
    jobLocation: JobLocation.REMOTE,
    seniority: Seniority.JUNIOR,
    salary: 0,
    shiftTime: ShiftTime.FULL_TIME,
    skills: [],
    status: JobOfferStatus.ACTIVE,
    createdAt: creationDate,
  };

  switch (jobLocation) {
    case JobLocation.ON_SITE:
      const JobOfferOnSite: IJobOfferOnSite = {
        ...base,
        city: city ?? { id: '', nombre: '' },
        jobLocation: JobLocation.ON_SITE,

        province: province ?? { id: '', nombre: '' },
      };
      return JobOfferOnSite;

    case JobLocation.HYBRID:
      const JobOfferHybrid: IJobOfferHybrid = {
        ...base,
        city: city ?? { id: '', nombre: '' },
        jobLocation: JobLocation.HYBRID,

        province: province ?? { id: '', nombre: '' },
      };
      return JobOfferHybrid;

    case JobLocation.REMOTE:
      const JobOfferRemote: IJobOfferRemote = {
        ...base,

        jobLocation,
      };
      return JobOfferRemote as IJobOfferRemote;
    default:
      return base as IJobOfferRemote;
  }
};

export const generateJobOfferValidationSchema = () => {
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
    city: Yup.object<Location>({
      id: Yup.string()
        .required()
        .when('jobLocation', {
          is: (val: JobLocation) => {
            return val === JobLocation.HYBRID || val === JobLocation.ON_SITE;
          },
          then(schema) {
            return schema.required('campo obligatorio');
          },
          otherwise(schema) {
            return schema.notRequired();
          },
        }),
      nombre: Yup.string()
        .required()
        .when('jobLocation', {
          is: (val: JobLocation) => {
            return val === JobLocation.HYBRID || val === JobLocation.ON_SITE;
          },
          then(schema) {
            return schema.required('campo obligatorio');
          },
          otherwise(schema) {
            return schema.notRequired();
          },
        }),
    }),
    province: Yup.object<Location>({
      id: Yup.string()
        .required()
        .when('jobLocation', {
          is: (val: JobLocation) => {
            return val === JobLocation.HYBRID || val === JobLocation.ON_SITE;
          },
          then(schema) {
            return schema.required('campo obligatorio');
          },
          otherwise(schema) {
            return schema.notRequired();
          },
        }),
      nombre: Yup.string()
        .required()
        .when('jobLocation', {
          is: (val: JobLocation) => {
            return val === JobLocation.HYBRID || val === JobLocation.ON_SITE;
          },
          then(schema) {
            return schema.required('campo obligatorio');
          },
          otherwise(schema) {
            return schema.notRequired();
          },
        }),
    }),
  });
  return baseValidationSchema as unknown as Yup.ObjectSchema<IJobOffer>;
};

const JobPostingForm = <T,>({
  userId,
  handleSubmit,
  loading,
  submitTextBtn = 'Crear oferta',
  valuesToEdit,
  mode = formModes.CREATE,
}: JobPostingFormProps<T>) => {
  const [jobOfferForm, setJobOfferForm] = useState<IJobOffer>(
    mode === formModes.EDIT && valuesToEdit
      ? valuesToEdit
      : generateJobOfferForm(JobLocation.REMOTE, userId)
  );

  const { isVisible } = useKeyboardState();
  const [loadingFormLocation, setLoadingFormLocation] = useState(false);
  const theme = useTheme();
  const jobOfferValidationSchema = useMemo(() => {
    return generateJobOfferValidationSchema();
  }, [jobOfferForm.jobLocation]);

  useEffect(() => {
    setJobOfferForm(generateJobOfferForm(jobOfferForm.jobLocation, userId));
  }, [jobOfferForm.jobLocation]);
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
        enableReinitialize={true}
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
          validateOnChange,
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
                      {mode === formModes.EDIT && (
                        <View style={utilityStyles.inputsContainer}>
                          <AppReactNativePaperSelect
                            multiEnable={false}
                            value={values.status}
                            selectedArrayList={[
                              { _id: values.status, value: values.status },
                            ]}
                            theme={theme}
                            dialogStyle={{
                              backgroundColor: theme.colors.background,
                            }}
                            hideSearchBox={true}
                            onSelection={(val) => {
                              setFieldValue('status', val.text);
                            }}
                            arrayList={Object.values(JobOfferStatus).map(
                              (el) => ({
                                _id: el,

                                label: el,
                                value: el,
                              })
                            )}
                            label='Status'
                          ></AppReactNativePaperSelect>
                        </View>
                      )}

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

                            setJobOfferForm(generateJobOfferForm(val, userId));
                            if (val === JobLocation.REMOTE) {
                              setFieldValue('province', undefined);
                              setFieldValue('city', undefined);
                            }
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
                                  {values?.province?.nombre}{' '}
                                  {values?.city?.nombre}
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
                                        province={values?.province}
                                        city={values?.city}
                                        handleSelectProvince={(
                                          val: MapLocation
                                        ) => {
                                          setFieldValue('province', val);
                                        }}
                                        handleSelectCity={(
                                          val: MapLocation
                                        ) => {
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
                <AppGenericSubmitBtn
                  {...{
                    loadingPostIndicator,
                    dirty,
                    isValid,
                    handleSubmit,
                    submitTextBtn,
                  }}
                ></AppGenericSubmitBtn>
                {/* <View
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
                      {submitTextBtn}
                    </Button>
                  )}
                  {loadingPostIndicator && (
                    <ActivityIndicator
                      color={theme.colors.primary}
                      size={'small'}
                    ></ActivityIndicator>
                  )}
                </View> */}
              </View>
            </>
          );
        }}
      </AppForm>
    </View>
  );
};

export default JobPostingForm;
