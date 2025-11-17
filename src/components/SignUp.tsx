import React, { useState } from 'react';
import ReactNativePaperSelect from '../ui/ReactNativePaperSelect';
import * as Yup from 'yup';
import { View, ScrollView, StyleSheet, Platform, Keyboard } from 'react-native';
import {
  Button,
  Text,
  useTheme,
  Checkbox,
  ActivityIndicator,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Role } from 'src/types/authContextTypes/userRole';

import { AppFormInputWithHelper } from '../ui/AppFormInputs';
import RoleSelector from './RoleSelector';

import { signUpNewUser } from 'src/services/auth';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { publicNavigatorRootStack } from '../navigators/publicNavigator/PublicNavigator';
import PUBLIC_NAVIGATOR_ROUTES from 'src/navigators/publicNavigator/PUBLIC_NAVIGATOR_ROUTES';

import utilityStyles from 'src/styles/utilityStyles';
import AppForm from './form/AppForm';

export interface SignUpForm {
  email: string;
  password: string;
  password2: string;
  name: string;
  lastName: string;
  role: Role;
  termsAndConditions: boolean;
}

const signUpForm: SignUpForm = {
  email: '',
  password: '',
  name: '',
  lastName: '',
  password2: '',
  role: Role.PROFESSIONAL,
  termsAndConditions: false,
};

const formValidationSchema = Yup.object({
  password: Yup.string()
    .required('campo obligatorio')
    .min(6, 'debe contener al menos 6 caracteres'),
  password2: Yup.string()
    .oneOf(
      [Yup.ref('password'), ''],
      'confirmar contraseña y contraseña deben ser iguales'
    )
    .required('campo obligatorio'),
  email: Yup.string()
    .email('ingresar un email válido')
    .required('campo obligatorio'),
  name: Yup.string().required('campo obligatorio'),
  lastName: Yup.string().required('campo obligatorio'),
  termsAndConditions: Yup.bool()
    .required()
    .oneOf([true], 'Se requiere aceptar terminos y condiciones'),
  role: Yup.string<Role>().required(),
});
export interface ISignUpUser {
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
}
export interface ISignUpUserForm extends ISignUpUser {
  termsAndConditions: boolean;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<publicNavigatorRootStack>>();
  const theme = useTheme();
  async function handleSubmit(values: SignUpForm) {
    setLoading(true);
    try {
      const { email, password, lastName, name, role } = values;
      const signUpUser: ISignUpUser = { email, password, lastName, name, role };
      const createdUser = await signUpNewUser(signUpUser);

      if (!createdUser.success) {
        return Toast.show({ text1: createdUser.message, type: 'error' });
      } else {
        return Toast.show({
          text1: createdUser.message,

          type: 'success',
          autoHide: true,
          iconColor: theme.colors.primary,
          visibilityTime: 500,
          theme: theme.dark ? 'dark' : 'light',

          progressBarColor: theme.colors.primary,

          onHide: () => {
            navigation.navigate(PUBLIC_NAVIGATOR_ROUTES.SIGN_IN, {});
          },
        });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppForm<SignUpForm>
      handleSubmit={handleSubmit}
      loadingPostIndicator={loading}
      validationSchema={formValidationSchema}
      formFields={signUpForm}
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
                <RoleSelector
                  defaultValue={Role.PROFESSIONAL}
                  handleChange={(val: Role) => handleInputValue('role', val)}
                ></RoleSelector>
              </View>
              <View style={utilityStyles.contentContainer}>
                <View style={utilityStyles.inputsContainer}>
                  <AppFormInputWithHelper<SignUpForm>
                    formKey='name'
                    value={values.name}
                    placeholder='Escribí tu nombre'
                    key={'name'}
                    label='Nombre'
                    onBlur={() => handleTextInputBlur('name')}
                    onFocus={() => setFieldTouched('name', true)}
                    onChangeText={handleChange('name')}
                    keyboardType='ascii-capable'
                    errorCondition={
                      Boolean(touched.name && errors.name) || false
                    }
                    errorMessage={errors.name ?? ''}
                  ></AppFormInputWithHelper>
                  <AppFormInputWithHelper<SignUpForm>
                    formKey='lastName'
                    value={values.lastName}
                    placeholder='Escribí tu apellido'
                    key={'lastName'}
                    label='Apellido'
                    onBlur={() => handleTextInputBlur('lastName')}
                    onFocus={() => setFieldTouched('lastName', true)}
                    onChangeText={handleChange('lastName')}
                    keyboardType='ascii-capable'
                    errorCondition={
                      Boolean(touched.lastName && errors.lastName) || false
                    }
                    errorMessage={errors.lastName ?? ''}
                  ></AppFormInputWithHelper>
                  <AppFormInputWithHelper<SignUpForm>
                    formKey='email'
                    value={values.email}
                    placeholder='Escribí tu correo electrónico'
                    key={'email'}
                    label='Correo electrónico'
                    onBlur={() => handleTextInputBlur('email')}
                    onFocus={() => setFieldTouched('email', true)}
                    onChangeText={handleChange('email')}
                    keyboardType='email-address'
                    errorCondition={
                      Boolean(touched.email && errors.email) || false
                    }
                    errorMessage={errors.email ?? ''}
                  ></AppFormInputWithHelper>
                  <AppFormInputWithHelper<SignUpForm>
                    formKey='password'
                    value={values.password}
                    placeholder='Escribí tu contraseña'
                    isTextSecureEntry={true}
                    key={'password'}
                    label='Contraseña'
                    onBlur={() => handleTextInputBlur('password')}
                    onFocus={() => setFieldTouched('password', true)}
                    onChangeText={handleChange('password')}
                    errorCondition={
                      Boolean(touched.password && errors.password) || false
                    }
                    errorMessage={errors.password ?? ''}
                  ></AppFormInputWithHelper>
                </View>
                <View style={utilityStyles.inputsContainer}>
                  <AppFormInputWithHelper<SignUpForm>
                    formKey='password2'
                    value={values.password2}
                    placeholder='Escribí tu contraseña'
                    isTextSecureEntry={true}
                    key={'password2'}
                    label='Repetir Contraseña'
                    onBlur={() => handleBlur('password2')}
                    onFocus={() => setFieldTouched('password2', true)}
                    onChangeText={handleChange('password2')}
                    errorCondition={
                      Boolean(touched.password2 && errors.password2) || false
                    }
                    errorMessage={errors.password2 ?? ''}
                  ></AppFormInputWithHelper>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  status={values.termsAndConditions ? 'checked' : 'unchecked'}
                  onPress={(e) => {
                    return handleInputValue(
                      'termsAndConditions',
                      !values.termsAndConditions
                    );
                  }}
                ></Checkbox>

                <Text variant='labelSmall'>
                  Acepto los términos y condiciones.
                </Text>
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
                  Crear cuenta
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
  );
};

export default SignUp;
