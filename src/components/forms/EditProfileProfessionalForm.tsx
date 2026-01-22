import { View } from 'react-native';
import React from 'react';

import { useEffect } from 'react';
import AppForm from '@components/forms/AppForm';

import * as Yup from 'yup';
import { Chip, Text, useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';

import { Role } from 'src/types/authContextTypes/userRole';

import {
  AppFormInput,
  AppFormInputWithHelper,
  InputHelper,
} from '../../ui/AppFormInputs';
import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';

import { useNavigation } from '@react-navigation/native';
import {
  EditProfileFormProps,
  UpdateProfessionalProfileFormShape,
  UpdateRecruiterProfileFormShape,
} from 'src/types/FormProps';
import AppGenericSubmitBtn from './AppGenericSubmitBtn';
import { IProfessional } from 'src/types/authContextTypes/authContextTypes';
import { ISkill, languagesList, skillsLists } from 'src/types/dbTypes/ISkills';
import { AppReactNativePaperSelectMultiple } from '@ui/AppReactNativePaperSelect';
import styled from 'styled-components/native';
import AppChipList from '@ui/AppChipList';

const editProfileValidationSchema: Yup.ObjectSchema<UpdateProfessionalProfileFormShape> =
  Yup.object({
    // password: Yup.string().required('campo obligatorio'),

    id: Yup.string().required('campo obligatorio'),
    name: Yup.string().required('campo obligatorio'),
    lastName: Yup.string().required('campo obligatorio'),
    email: Yup.string()
      .email('ingresar un email válido')
      .required('campo obligatorio'),
    skills: Yup.array<ISkill>()
      .default([])
      .min(1, 'elegir al menos una skill')
      .max(5, 'máximo de skills permitidas : 5 ')
      .required(),
    languages: Yup.array<ISkill>()
      .default([])
      .min(1, 'elegir al menos un idioma')
      .required(),
    role: Yup.string()
      .required()
      .oneOf([Role.PROFESSIONAL]) as Yup.Schema<Role.PROFESSIONAL>,
    avatarUrl: Yup.string(),
  });

const EditProfileProfessionalForm = ({
  user,
  loading,
  handleSubmit,
}: EditProfileFormProps<
  UpdateProfessionalProfileFormShape,
  UpdateProfessionalProfileFormShape,
  IProfessional
>) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { isVisible } = useKeyboardState();

  return (
    <View
      style={{
        ...utilityStyles.contentContainer,
        ...utilityStyles.flex,
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      <AppForm<UpdateProfessionalProfileFormShape>
        handleSubmit={handleSubmit}
        formFields={user}
        loadingPostIndicator={loading}
        validationSchema={editProfileValidationSchema}
        key={user.id}
      >
        {(props) => {
          const {
            handleInputValue,
            handleTextInputBlur,
            setFieldTouched,
            handleChange,
            values,
            touched,
            errors,
            dirty,
            isValid,
            handleResetForm,
            handleSubmit,
            setFieldValue,
            loadingPostIndicator,
          } = props;
          useEffect(() => {
            const unsubscribe = navigation.addListener('focus', function () {
              handleResetForm(user);
            });

            return unsubscribe;
          }, [user]);
          return (
            <>
              {/* <Text>User to update is Professional</Text> */}
              <Text>{JSON.stringify(errors)}</Text>
              {/* <Text>{JSON.stringify(user)}</Text> */}
              <View
                style={[
                  {
                    backgroundColor: theme.colors.background,
                    marginBottom: 'auto',
                    flex: 1,
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
                        <AppFormInput
                          label='E-mail'
                          formKey={'email'}
                          key={'email'}
                          value={values.email}
                          disabled
                        ></AppFormInput>
                      </View>
                      <View style={{ gap: 8 }}>
                        <AppFormInputWithHelper<UpdateRecruiterProfileFormShape>
                          formKey='name'
                          value={values.name}
                          key={'name'}
                          label='Nombre'
                          onBlur={() => handleTextInputBlur('name')}
                          onFocus={() => setFieldTouched('name', true)}
                          onChangeText={(e) => {
                            handleInputValue('name', e);
                          }}
                          errorCondition={
                            Boolean(touched.name && errors.name) || false
                          }
                          errorMessage={errors.name ?? ''}
                        ></AppFormInputWithHelper>
                      </View>
                      <View style={utilityStyles.inputsContainer}>
                        <AppFormInputWithHelper<UpdateRecruiterProfileFormShape>
                          formKey='lastName'
                          value={values.lastName}
                          key={'lastName'}
                          label='Apellido'
                          onBlur={() => handleTextInputBlur('lastName')}
                          onFocus={() => setFieldTouched('lastName', true)}
                          onChangeText={(e) => {
                            handleInputValue('lastName', e);
                          }}
                          errorCondition={
                            Boolean(touched.lastName && errors.lastName) ||
                            false
                          }
                          errorMessage={errors.lastName ?? ''}
                        ></AppFormInputWithHelper>
                      </View>
                      <View style={utilityStyles.inputsContainer}>
                        <Text variant='titleLarge'>
                          Cuales son tus skills ?{' '}
                        </Text>
                        <Text variant='labelSmall'>
                          Selecciona hasta 5 para recibir los mejores
                          matches{' '}
                        </Text>
                        <AppReactNativePaperSelectMultiple
                          handleSelectedListChange={(val) =>
                            setFieldValue(
                              'skills',
                              val.map((el) => ({ name: el.value })),
                            )
                          }
                          label='Skills'
                          selectedList={
                            values?.skills?.map((el) => ({
                              _id: el.name,
                              value: el.name,
                            })) || []
                          }
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

                        {values?.skills.length > 0 && (
                          <AppChipList>
                            {values.skills.map((skill) => (
                              <Chip key={skill.name}>{skill.name}</Chip>
                            ))}
                          </AppChipList>
                        )}
                      </View>
                      <View style={{ gap: 8 }}>
                        <Text variant='titleLarge'>Que idiomas dominas ? </Text>

                        <AppReactNativePaperSelectMultiple
                          displayTitle='Idiomas'
                          handleSelectedListChange={(val) =>
                            setFieldValue(
                              'languages',
                              val.map((el) => ({ name: el.value })),
                            )
                          }
                          label='Idiomas'
                          selectedList={
                            values?.languages?.map((el) => ({
                              _id: el.name,
                              value: el.name,
                            })) || []
                          }
                          list={languagesList.map((el) => ({
                            _id: el.name,

                            value: el.name,
                          }))}
                        >
                          <InputHelper
                            errorCondition={errors.languages !== undefined}
                            errorMessage={errors?.languages?.toString() ?? ''}
                          ></InputHelper>
                        </AppReactNativePaperSelectMultiple>

                        {values?.languages.length > 0 && (
                          <AppChipList>
                            {values.languages.map((language) => (
                              <Chip key={language.name}>{language.name}</Chip>
                            ))}
                          </AppChipList>
                        )}
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <View
                  style={{
                    marginTop: 'auto',
                    flex: 1,
                    display: 'flex',
                  }}
                >
                  <AppGenericSubmitBtn
                    {...{
                      loadingPostIndicator,
                      dirty,
                      isValid,
                      handleSubmit,
                    }}
                    submitTextBtn={'Actualizar Perfil'}
                  ></AppGenericSubmitBtn>
                </View>
              </View>
            </>
          );
        }}
      </AppForm>
    </View>
  );
};

export default EditProfileProfessionalForm;
