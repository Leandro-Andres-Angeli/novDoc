import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import AppForm from '@components/forms/AppForm';

import * as Yup from 'yup';
import { useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';

import { Role } from 'src/types/authContextTypes/userRole';
import { isRecruiter } from '@utils/checkUserType';
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
import AppGenericSubmitBtn from './AppGenericSubmitBtn';
import { UserTypes } from 'src/types/authContextTypes/authContextTypes';

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
  loading,
  handleSubmit,
}: EditProfileFormProps<
  UpdateRecruiterProfileFormShape,
  UpdateRecruiterProfileFormShape
>) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { isVisible } = useKeyboardState();

  useEffect(() => {
    console.log('render');
  }, []);

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
        <AppForm<UpdateRecruiterProfileFormShape>
          handleSubmit={handleSubmit}
          formFields={user}
          loadingPostIndicator={loading}
          validationSchema={editProfileValidationSchema}
          key={user.id}

          // dinaymicParams={[Object.keys(user)]}
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
              setValues(user);
            }, [user, setValues]);
            // useEffect(() => {
            //   const unsubscribe = navigation.addListener('focus', function () {
            //     setValues(user);
            //   });

            //   return unsubscribe;
            // }, []);
            // useEffect(() => {
            //   const unsubscribe = navigation.addListener(
            //     'state',
            //     function ({ target }) {
            //       console.log('state');
            //       console.log('state args', arguments);
            //       console.log('target', target);
            //       handleReset();
            //     }
            //   );

            //   return unsubscribe;
            // }, []);

            return (
              <>
                <Text>{JSON.stringify(errors)}</Text>
                <Text>{JSON.stringify(user)}</Text>
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
  } else {
    return (
      <View>
        <Text>Not handled yet</Text>
      </View>
    );
  }
};

export default EditProfileForm;
