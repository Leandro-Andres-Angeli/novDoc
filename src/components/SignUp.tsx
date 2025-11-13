import React, { useState } from 'react';
import ReactNativePaperSelect from '../ui/ReactNativePaperSelect';
import * as Yup from 'yup';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  SegmentedButtons,
  Avatar,
  Text,
  useTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import { Role, rolesList } from 'src/types/authContextTypes/userRole';
import { useFormik } from 'formik';

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
  const { setFieldValue, handleChange, handleBlur, setFieldTouched } = formik;

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
          <ReactNativePaperSelect<string>
            theme={theme}
            hideSearchBox={true}
            textInputStyle={{ backgroundColor: theme.colors.background }}
            onSelect={f}
            dialogStyle={{ backgroundColor: theme.colors.background }}
            checkboxProps={{
              checkboxColor: theme.colors.primary,
            }}
            label='Perfil'
            dialogDoneButtonText='Ok'
            dialogCloseButtonText='Cancelar'
            multiEnable={false}
            onSelection={() => {}}
            selectedArrayList={[]}
            arrayList={rolesList.map((val) => ({ _id: val, value: val }))}
            value={''}
          ></ReactNativePaperSelect>
          {/* Segmented Buttons */}

          <View style={styles.contentContainer}>
            {/* Text Input Fields */}
            <View style={styles.inputsContainer}>
              <TextInput
                label='Full Name'
                value={formik.values.firstName}
                onChangeText={formik.handleChange}
                placeholder='e.g. Jane Doe'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              {/*   <TextInput
                label='Headline'
                value={headline}
                onChangeText={setHeadline}
                placeholder='e.g. Senior iOS Engineer'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />
 */}
              {/*      <TextInput
                label='Location'
                value={location}
                onChangeText={setLocation}
                placeholder='e.g. San Francisco, CA'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              /> */}

              {/*         <TextInput
                label='About Me'
                value={aboutMe}
                onChangeText={setAboutMe}
                placeholder='Tell us a little about yourself...'
                mode='flat'
                multiline
                numberOfLines={4}
                style={[
                  styles.input,
                  styles.textArea,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />
             */}
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
          <Button
            mode='contained'
            style={styles.fab}
            contentStyle={styles.fabContent}
            labelStyle={styles.fabLabel}
            onPress={() => formik.handleSubmit}
          >
            Crear cuenta
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
  /*   return (
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
          <ReactNativePaperSelect<string>
            theme={theme}
            hideSearchBox={true}
            onSelect={f}
            dialogStyle={{ backgroundColor: theme.colors.background }}
            checkboxProps={{
              checkboxColor: theme.colors.primary,
            }}
            label='Perfil'
            dialogDoneButtonText='Ok'
            dialogCloseButtonText='Cancelar'
            multiEnable={false}
            onSelection={() => {}}
            selectedArrayList={[]}
            arrayList={rolesList.map((val) => ({ _id: val, value: val }))}
            value={''}
          ></ReactNativePaperSelect>
         

          <View style={styles.contentContainer}>
            
            <View style={styles.inputsContainer}>
              <TextInput
                label='Full Name'
                value={formik.values.firstName}
                onChangeText={formik.handleChange}
                placeholder='e.g. Jane Doe'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='Headline'
                value={headline}
                onChangeText={setHeadline}
                placeholder='e.g. Senior iOS Engineer'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='Location'
                value={location}
                onChangeText={setLocation}
                placeholder='e.g. San Francisco, CA'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='About Me'
                value={aboutMe}
                onChangeText={setAboutMe}
                placeholder='Tell us a little about yourself...'
                mode='flat'
                multiline
                numberOfLines={4}
                style={[
                  styles.input,
                  styles.textArea,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />
            </View>

           
            <View style={{ height: 100 }} />
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
            onPress={() => formik.handleSubmit}
          >
            Crear cuenta
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  ); */
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
