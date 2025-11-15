import React, { useState } from 'react';
import ReactNativePaperSelect from '../ui/ReactNativePaperSelect';
import * as Yup from 'yup';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  TextInputProps,
  Checkbox,
} from 'react-native-paper';
import { Role, rolesList } from 'src/types/authContextTypes/userRole';
import { useFormik } from 'formik';
import { FormInputWithHelper } from '../ui/FormInputs';
import RoleSelector from './RoleSelector';
import { IUser } from 'src/types/authContextTypes/authContextTypes';
import { signUpNewUser } from 'src/services/auth';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { publicNavigatorRootStack } from '../navigators/publicNavigator/PublicNavigator';
import PUBLIC_NAVIGATOR_ROUTES from 'src/navigators/publicNavigator/PUBLIC_NAVIGATOR_ROUTES';

export interface SignUpForm {
  email: string;
  password: string;
  password2: string;
  name: string;
  lastName: string;
  role: Role;
  termsAndConditions: boolean;
}

export interface IProfessional extends IUser {
  skills: Array<string>;
  languages: Array<string>;
  role: Role.PROFESSIONAL;
}
export interface IRecruiter extends IUser {
  role: Role.RECRUITER;
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
  lastName: Yup.string().required(),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    'Se requiere aceptar terminos y condiciones'
  ),
});
export interface ISignUpUser {
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
}
const SignUp = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [processingForm, setProcessinForm] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<publicNavigatorRootStack>>();
  const theme = useTheme();
  const handleSubmit = async () => {
    console.log(formik.values);
    setProcessinForm(true);
    try {
      const { email, password, lastName, name, role } = formik.values;
      const signUpUser: ISignUpUser = { email, password, lastName, name, role };
      const createdUser = await signUpNewUser(signUpUser);

      if (!createdUser.success) {
        console.log('error');
        Toast.error(createdUser.message);
      } else {
        Toast.show({
          text1: createdUser.message,
          type: 'success',
          autoHide: true,
          theme: theme.dark ? 'dark' : 'light',
          onHide: () => {
            navigation.navigate(PUBLIC_NAVIGATOR_ROUTES.SIGN_IN, {});
          },
        });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setProcessinForm(false);
    }
  };
  const formik = useFormik({
    initialValues: signUpForm,
    validationSchema: formValidationSchema,

    onSubmit: handleSubmit,
  });
  const {
    setFieldValue,
    handleChange,
    handleBlur,
    setFieldTouched,
    dirty,
    isValid,
    values,
    touched,
    errors,
  } = formik;
  const handleInputValue = <T extends keyof SignUpForm>(
    key: T,
    value: SignUpForm[T]
  ) => {
    setFieldValue(key, value);
  };
  const handleTextInputBlur = (key: keyof SignUpForm) => {
    handleBlur(key);
    Keyboard.dismiss();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <RoleSelector
            defaultValue={Role.PROFESSIONAL}
            handleChange={(val: Role) => handleInputValue('role', val)}
          ></RoleSelector>

          <View style={styles.contentContainer}>
            {/* Text Input Fields */}
            <View style={styles.inputsContainer}>
              <FormInputWithHelper<SignUpForm>
                formKey='name'
                value={values.name}
                placeholder='Escribí tu nombre'
                key={'name'}
                label='Nombre'
                onBlur={() => handleTextInputBlur('name')}
                onFocus={() => setFieldTouched('name', true)}
                onChangeText={handleChange('name')}
                keyboardType='ascii-capable'
                errorCondition={Boolean(touched.name && errors.name) || false}
                errorMessage={errors.name ?? ''}
              ></FormInputWithHelper>
              <FormInputWithHelper<SignUpForm>
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
              ></FormInputWithHelper>
              <FormInputWithHelper<SignUpForm>
                formKey='email'
                value={values.email}
                placeholder='Escribí tu correo electrónico'
                key={'email'}
                label='Correo electrónico'
                onBlur={() => handleTextInputBlur('email')}
                onFocus={() => setFieldTouched('email', true)}
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                errorCondition={Boolean(touched.email && errors.email) || false}
                errorMessage={errors.email ?? ''}
              ></FormInputWithHelper>
              <FormInputWithHelper<SignUpForm>
                formKey='password'
                value={values.password}
                placeholder='Escribí tu contraseña'
                secureTextEntry={true}
                key={'password'}
                label='Contraseña'
                onBlur={() => handleTextInputBlur('password')}
                onFocus={() => setFieldTouched('password', true)}
                onChangeText={handleChange('password')}
                errorCondition={
                  Boolean(touched.password && errors.password) || false
                }
                errorMessage={errors.password ?? ''}
              ></FormInputWithHelper>
            </View>
            <View style={styles.inputsContainer}>
              <FormInputWithHelper<SignUpForm>
                formKey='password2'
                value={values.password2}
                placeholder='Escribí tu contraseña'
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                    onPress={() => setSecureTextEntry((prev) => !prev)}
                  />
                }
                key={'password2'}
                label='Repetir Contraseña'
                onBlur={() => handleBlur('password2')}
                onFocus={() => setFieldTouched('password2', true)}
                onChangeText={handleChange('password2')}
                errorCondition={
                  Boolean(touched.password2 && errors.password2) || false
                }
                errorMessage={errors.password2 ?? ''}
              ></FormInputWithHelper>
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
              status={
                (formik.values.termsAndConditions && 'checked') || 'unchecked'
              }
              onPress={(e) => {
                handleInputValue(
                  'termsAndConditions',
                  !formik.values.termsAndConditions
                );
              }}
            ></Checkbox>
            <Text variant='labelSmall'>Acepto los términos y condiciones.</Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.fabContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <Button
            mode='contained'
            style={styles.fab}
            contentStyle={styles.fabContent}
            labelStyle={styles.fabLabel}
            onPress={() => formik.handleSubmit()}
            disabled={(dirty && !isValid) || !dirty || processingForm}
          >
            Crear cuenta
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },

  inputsContainer: {
    gap: 16,
  },
  input: {
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3f3f46',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  fab: {
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabContent: {
    height: 48,
  },
  fabLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignUp;
