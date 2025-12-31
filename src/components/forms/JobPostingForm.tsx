import { View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppForm from './AppForm';

import * as Yup from 'yup';
import { ISkill, skillsLists } from 'src/types/dbTypes/ISkills';
import { Timestamp } from 'firebase/firestore';
import { Chip, Text, useTheme } from 'react-native-paper';

import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';
import { AppFormInputWithHelper, InputHelper } from '@ui/AppFormInputs';
import AppSubtitle from '@ui/AppSubtitle';
import AppSegmentedButtons from '@components/AppSegmentedButtons';

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
import {
  IJobPosting,
  IJobPostingGeneral,
  IJobPostingHybrid,
  IJobPostingOnSite,
  IJobPostingRemote,
  JobLocation,
  jobPostingStatus,
  MapLocation,
  Seniority,
  ShiftTime,
} from 'src/types/dbTypes/IJobOffer';
import jobPostingHasLocation from '@utils/jobPostingHasLocation';

export const generatejobPostingForm = (
  jobLocation: JobLocation,
  userId: string,
  province?: MapLocation,
  city?: MapLocation
) => {
  const creationDate = Timestamp.fromDate(new Date());
  const base: IJobPostingGeneral = {
    title: '',
    company: '',
    recruiter_id: userId,
    description: '',
    jobLocation: JobLocation.REMOTE,
    seniority: Seniority.JUNIOR,
    salary: 0,
    shiftTime: ShiftTime.FULL_TIME,
    skills: [],
    status: jobPostingStatus.ACTIVE,
    createdAt: creationDate,
    updatedAt: creationDate,
  };

  switch (jobLocation) {
    case JobLocation.ON_SITE:
      const jobPostingOnSite: IJobPostingOnSite = {
        ...base,
        city: city ?? { id: '', nombre: '' },
        jobLocation: JobLocation.ON_SITE,

        province: province ?? { id: '', nombre: '' },
      };
      return jobPostingOnSite;

    case JobLocation.HYBRID:
      const jobPostingHybrid: IJobPostingHybrid = {
        ...base,
        city: city ?? { id: '', nombre: '' },
        jobLocation: JobLocation.HYBRID,

        province: province ?? { id: '', nombre: '' },
      };
      return jobPostingHybrid;

    case JobLocation.REMOTE:
      const jobPostingRemote: IJobPostingRemote = {
        ...base,

        jobLocation,
      };
      return jobPostingRemote as IJobPostingRemote;
    default:
      return base as IJobPostingRemote;
  }
};

export const generatejobPostingValidationSchema = () => {
  const baseValidationSchema = Yup.object<IJobPosting>({
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
  return baseValidationSchema as unknown as Yup.ObjectSchema<IJobPosting>;
};

const JobPostingForm = <T,>({
  userId,
  handleSubmit,
  loading,
  submitTextBtn = 'Crear oferta',
  valuesToEdit,
  mode = formModes.CREATE,
}: JobPostingFormProps<T>) => {
  const [jobPostingForm, setjobPostingForm] = useState<IJobPosting>(
    generatejobPostingForm(JobLocation.REMOTE, userId)
  );

  const { isVisible } = useKeyboardState();
  const [loadingFormLocation, setLoadingFormLocation] = useState(false);
  const theme = useTheme();
  const jobPostingValidationSchema = useMemo(() => {
    return generatejobPostingValidationSchema();
  }, [jobPostingForm.jobLocation]);

  useEffect(() => {
    setjobPostingForm(
      generatejobPostingForm(jobPostingForm.jobLocation, userId)
    );
  }, [jobPostingForm.jobLocation]);
  // const navigation = useNavigation();
  return (
    <View
      style={{
        ...utilityStyles.contentContainer,
        ...utilityStyles.flex,
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      {/* <Text>{JSON.stringify(jobPostingForm)}</Text> */}
      <AppForm<IJobPosting>
        handleSubmit={handleSubmit}
        loadingPostIndicator={loading}
        validationSchema={jobPostingValidationSchema}
        formFields={valuesToEdit ?? jobPostingForm}
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
          handleResetForm,
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
                            arrayList={Object.values(jobPostingStatus).map(
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
                        <AppFormInputWithHelper<IJobPosting>
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
                        <AppFormInputWithHelper<IJobPosting>
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
                        <AppFormInputWithHelper<IJobPosting>
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

                            setjobPostingForm(
                              generatejobPostingForm(val, userId)
                            );
                            if (val === JobLocation.REMOTE) {
                              setFieldValue('province', undefined);
                              setFieldValue('city', undefined);
                            }
                          }}
                        ></AppSegmentedButtons>

                        {jobPostingHasLocation(values) && (
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
                        {jobPostingHasLocation(values) && (
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
                        <AppFormInputWithHelper<IJobPosting>
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
              </View>
            </>
          );
        }}
      </AppForm>
    </View>
  );
};

export default JobPostingForm;
