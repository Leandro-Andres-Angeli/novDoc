import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  ListItemProps,
  useTheme,
} from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { AppFormInputWithHelper } from '@ui/AppFormInputs';
import AppSegmentedButtons from '../AppSegmentedButtons';
import geoRefAxiosInstance, {
  geoRefAxiosInstanceEndpoints,
} from 'axios/geoRef';
import {
  GeoRefProvincesResponse,
  Provincia,
} from 'src/types/geoRefResponses/geoRefProvinces';
import AppLoading from '@ui/AppLoading';
import AppReactNativePaperSelect from '../../ui/AppReactNativePaperSelect';
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import { IconButton } from 'react-native-paper';
interface LocationPickerProps {
  handleSelectProvince: (val: string) => void;
}
const LocationPicker = ({ handleSelectProvince }: LocationPickerProps) => {
  const [provinces, setProvinces] = useState<Provincia[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<ListItem>(
    {} as ListItem
  );

  useEffect(() => {
    handleSelectProvince(selectedProvince.value);
  }, [selectedProvince._id]);

  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const getProvinces = async () => {
    setLoading(true);
    try {
      const {
        data: { provincias },
      } = await geoRefAxiosInstance.get<GeoRefProvincesResponse>(
        geoRefAxiosInstanceEndpoints.PROVINCES
      );
      console.log('DATA', provincias);
      setProvinces(provincias);
      setSelectedProvince({
        _id: provincias.at(0)?.id ?? '',
        value: provincias.at(0)?.iso_nombre ?? '',
      });
    } catch (error) {
      console.log('error obteniendo provincias');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProvinces();
  }, []);
  if (loading) {
    return <AppLoading></AppLoading>;
  }
  return (
    (provinces.length > 0 && !loading && (
      <AppReactNativePaperSelect
        multiEnable={false}
        value={selectedProvince.value}
        selectedArrayList={[selectedProvince]}
        theme={theme}
        dialogStyle={{ backgroundColor: theme.colors.background }}
        hideSearchBox={true}
        onSelection={(val) =>
          setSelectedProvince({
            _id: val.selectedList.at(0)?._id ?? '',
            value: val.selectedList.at(0)?.value ?? '',
          })
        }
        arrayList={provinces.map((el) => ({
          ...el,
          _id: el.id,
          label: el.iso_nombre,
          value: el.iso_nombre,
        }))}
        label='Provincias'
      ></AppReactNativePaperSelect>
    )) || <></>
  );
};
const NewJobOffer = () => {
  // const jobOfferForm: Pick<IJobOffer, 'title' | 'description' | 'jobLocation'> =
  //   {
  //     title: '',
  //     description: '',
  //     jobLocation: JobLocation.REMOTE,

  //     // salary: 0,
  //     // seniority: seniority.JUNIOR,
  //     // shiftTime: ShiftTime.PART_TIME,
  //     // skills: [],
  //   };
  const generateJobOfferForm = (
    jobLocation: JobLocation,
    prevData?: Record<string, any>
  ) => {
    const base: IJobOfferGeneral = {
      title: '',
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
          locality: '',
          province: '',
        };
        return JobOfferOnSite;

      case JobLocation.HYBRID:
        const JobOfferHybrid: IJobOfferHybrid = {
          ...base,
          city: '',
          jobLocation: JobLocation.HYBRID,
          locality: '',
          province: '',
        };
        return JobOfferHybrid;

      case JobLocation.REMOTE:
        const JobOfferRemote: IJobOfferRemote = {
          ...base,

          jobLocation: JobLocation.REMOTE,
        };
        return JobOfferRemote;
    }
  };

  const generateJobOfferValidationSchema = (jobLocation: JobLocation) => {
    const baseValidationSchema = Yup.object({
      title: Yup.string().required('campo obligatorio'),
      description: Yup.string().required('campo obligatorio'),
      jobLocation: Yup.string<JobLocation>()
        .oneOf([JobLocation.REMOTE])
        .required(),

      salary: Yup.number()
        .min(200, 'No puede ser menor a 200$')
        .required('campo obligatorio'),
      seniority: Yup.string<Seniority>().required('campo obligatorio'),
      shiftTime: Yup.string<ShiftTime>().required('campo obligatorio'),
      skills: Yup.array()
        .of(Yup.string().defined())
        .required()
        .min(1, 'elegir al menos una skill'),
    });

    switch (jobLocation) {
      case JobLocation.ON_SITE:
        return baseValidationSchema.shape({
          jobLocation: Yup.string<JobLocation>()
            .oneOf([JobLocation.ON_SITE])
            .required(),
          city: Yup.string().required('campo obligatorio'),
          locality: Yup.string().required('campo obligatorio'),
          province: Yup.string().required('campo obligatorio'),
        });

      case JobLocation.HYBRID:
        return baseValidationSchema.shape({
          jobLocation: Yup.string<JobLocation>()
            .oneOf([JobLocation.HYBRID])
            .required(),
          city: Yup.string().required('campo obligatorio'),
          locality: Yup.string().required('campo obligatorio'),
          province: Yup.string().required('campo obligatorio'),
        });

      case JobLocation.REMOTE:
        return baseValidationSchema;
      default:
        return baseValidationSchema;
    }
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
  const [jobOfferValidationSchema, setJobOfferValidationSchema] = useState(
    generateJobOfferValidationSchema(JobLocation.REMOTE)
  );

  useEffect(() => {
    console.log('changed job location');

    setJobOfferValidationSchema(
      generateJobOfferValidationSchema(jobOfferForm.jobLocation)
    );
  }, [jobOfferForm.jobLocation]);

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
    <>
      {/* <Text>{JSON.stringify(jobOfferForm, null)}</Text> */}
      <View
        style={{
          ...utilityStyles.contentContainer,
          ...utilityStyles.flex,
          marginTop: 20,
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
            handleBlur,
            handleSubmit,
            loadingPostIndicator,
            setFieldValue,

            setValues,
          }) => {
            return (
              <>
                {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}

                <View
                  style={[
                    utilityStyles.container,
                    {
                      backgroundColor: theme.colors.background,
                      overflow: 'scroll',
                    },
                  ]}
                >
                  <KeyboardAwareScrollView>
                    <ScrollView>
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
                              Boolean(
                                touched.description && errors.description
                              ) || false
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
                            handleChange={(val: JobLocation) => {
                              setValues(generateJobOfferForm(val), true);
                            }}
                          ></AppSegmentedButtons>

                          {jobOfferHasLocation(values) ? (
                            <View style={{ ...utilityStyles.inputsContainer }}>
                              <LocationPicker
                                handleSelectProvince={(val) => {
                                  setFieldValue('province', val);
                                }}
                              ></LocationPicker>
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                      </View>
                    </ScrollView>
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
    </>
  );
};

export default NewJobOffer;
