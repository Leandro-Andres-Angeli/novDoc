import { View, Text } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppForm from '@components/forms/AppForm';
import { IRecruiter, IUser } from 'src/types/authContextTypes/authContextTypes';
import * as Yup from 'yup';
import { useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import { isProfessional, isRecruiter } from '@utils/checkUserType';
import { AppFormInput, AppFormInputWithHelper } from '../../ui/AppFormInputs';
import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';

import { useNavigation } from '@react-navigation/native';
import {
  EditProfileFormProps,
  UpdateRecruiterProfileFormShape,
} from 'src/types/FormProps';

const editProfileValidationSchema: Yup.ObjectSchema<UpdateRecruiterProfileFormShape> =
  Yup.object({
    // password: Yup.string().required('campo obligatorio'),

    id: Yup.string().required('campo obligatorio'),
    name: Yup.string().required('campo obligatorio'),
    lastName: Yup.string().required('campo obligatorio'),
    email: Yup.string()
      .email('ingresar un email válido')
      .required('campo obligatorio'),

    role: Yup.string()
      .required()
      .oneOf([Role.RECRUITER]) as Yup.Schema<Role.RECRUITER>,
    avatarUrl: Yup.string(),
  });

const EditProfileForm = ({
  user,
}: EditProfileFormProps<
  UpdateRecruiterProfileFormShape,
  UpdateRecruiterProfileFormShape
>) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const handleSubmit = async () => {};

  const { isVisible } = useKeyboardState();

  if (isRecruiter(user)) {
    return (
      <View
        style={{
          ...utilityStyles.contentContainer,
          ...utilityStyles.flex,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Text>{JSON.stringify(user)}</Text>
        <AppForm<UpdateRecruiterProfileFormShape>
          handleSubmit={handleSubmit}
          formFields={user}
          enableReinitialize={true}
          validationSchema={editProfileValidationSchema}
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

              handleSubmit,
              loadingPostIndicator,
              setFieldValue,
              validateOnChange,
              setValues,
              handleReset,
            } = props;

            useEffect(() => {
              const unsubscribe = navigation.addListener('focus', function () {
                handleReset();
              });

              return unsubscribe;
            }, []);
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
                          <AppFormInput
                            label='E-mail'
                            formKey={'email'}
                            key={'email'}
                            value={values.email}
                            disabled
                          ></AppFormInput>
                        </View>
                        <View style={utilityStyles.inputsContainer}>
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
                      </View>
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </>
            );
          }}
        </AppForm>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Not handled yet</Text>
      </View>
    );
  }
};

export default EditProfileForm;
