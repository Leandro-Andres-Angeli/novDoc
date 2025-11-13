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
} from 'react-native-paper';
import { Role, rolesList } from 'src/types/authContextTypes/userRole';
import { useFormik } from 'formik';
import { FormInputWithHelper } from '../ui/FormInputs';

export interface SignUpForm {
  email: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  role: Role;
  terminosYCondiciones: boolean;
}
const signUpForm: SignUpForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  password2: '',
  role: Role.PROFESSIONAL,
  terminosYCondiciones: false,
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
  nombre: Yup.string().required('campo obligatorio'),
  apellido: Yup.string().required(),
  terminosYCondiciones: Yup.bool().oneOf(
    [true],
    'Accept Terms & Conditions is required'
  ),
});
const SignUp = () => {
  const theme = useTheme();

  const f = (val: any) => {};
  const formik = useFormik({
    initialValues: signUpForm,
    validationSchema: formValidationSchema,

    onSubmit: () => console.log('submit form'),
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
          <View style={{ padding: 15 }}>
            <ReactNativePaperSelect<Role>
              theme={theme}
              hideSearchBox={true}
              textInputStyle={{
                backgroundColor: theme.colors.background,
                borderWidth: 0.5,
                borderColor: 'black',
                textTransform: 'capitalize',
              }}
              dialogStyle={{ backgroundColor: theme.colors.background }}
              checkboxProps={{
                checkboxColor: theme.colors.primary,
              }}
              label='Perfil'
              dialogDoneButtonText='Ok'
              dialogCloseButtonText='Cancelar'
              multiEnable={false}
              onSelection={({ selectedList }) => {
                const parsed = selectedList.at(0)?.value as Role;

                handleInputValue('role', parsed);
              }}
              selectedArrayList={[
                { _id: formik.values.role, value: formik.values.role },
              ]}
              arrayList={rolesList.map((val) => ({ _id: val, value: val }))}
              value={formik.values.role}
            ></ReactNativePaperSelect>
          </View>
          {/* Segmented Buttons */}

          <View style={styles.contentContainer}>
            {/* Text Input Fields */}
            <View style={styles.inputsContainer}>
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
            {/* Bottom spacing for button */}
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <View
          style={[
            styles.fabContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              mode='outlined'
              placeholder='Enter your email'
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}
              outlineColor='#d4d4d8'
              activeOutlineColor={theme.colors.primary}
              theme={{
                colors: {
                  //   background: '#f4f4f5',
                },
              }}
            />
          </View>

          <Button
            mode='contained'
            style={styles.fab}
            contentStyle={styles.fabContent}
            labelStyle={styles.fabLabel}
            onPress={() => formik.handleSubmit}
            disabled={(dirty && !isValid) || !dirty}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  segmentedContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionHeader: {
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 4,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  profilePictureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  uploadButton: {
    borderRadius: 8,
  },
  uploadButtonContent: {
    height: 32,
    paddingHorizontal: 8,
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
