import * as React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { publicNavigatorRootStack } from 'src/navigators/publicNavigator/PublicNavigator';

import styled from 'styled-components/native';

import AppButton from '@ui/AppButton';
import AppButtonText from '@ui/AppButtonText';

import AppForm from './form/AppForm';
import * as Yup from 'yup';

import utilityStyles from 'src/styles/utilityStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { AppFormInput, AppFormInputSecureTextEntry } from '../ui/AppFormInputs';
import { signInUser } from 'src/services/auth';
import { Toast } from 'toastify-react-native';
import { useTheme } from 'react-native-paper';

const ButtonContainer = styled.View<{ isLandscape: boolean }>`
  width: ${(props) => (props.isLandscape ? 'auto' : '100%')};
  max-width: 448px;
  align-self: center;
  ${(props) => props.isLandscape && 'margin-right: 16px;'}
`;

const SignIn = () => {
  interface ISignInForm {
    email: string;
    password: string;
  }
  const signInForm: ISignInForm = {
    email: '',
    password: '',
  };
  const formValidationSchema = Yup.object({
    password: Yup.string().required('campo obligatorio'),
    email: Yup.string()
      .email('ingresar un email válido')
      .required('campo obligatorio'),
  });
  const theme = useTheme();
  async function handleSubmit(values: ISignInForm) {
    const signedUser = await signInUser(values.email, values.password);

    if (!signedUser.success) {
      return Toast.show({ text1: signedUser?.message, type: 'error' });
    }
  }

  return (
    <AppForm<ISignInForm>
      validationSchema={formValidationSchema}
      handleSubmit={handleSubmit}
      formFields={signInForm}
    >
      {(props) => {
        const {
          handleTextInputBlur,
          values,
          setFieldTouched,
          handleChange,
          submitForm,
        } = props;
        return (
          <View
            style={[
              { backgroundColor: theme.colors.background },
              utilityStyles.contentContainer,
            ]}
          >
            <View style={utilityStyles.contentContainer}>
              <AppFormInput
                formKey={'email'}
                placeholder='Escribí tu email'
                key={'email'}
                value={values.email}
                label='E-mail'
                onBlur={() => handleTextInputBlur('email')}
                onFocus={() => setFieldTouched('email', true)}
                onChangeText={handleChange('email')}
                keyboardType='email-address'
              ></AppFormInput>
            </View>
            <View style={utilityStyles.contentContainer}>
              <AppFormInputSecureTextEntry
                formKey={'password'}
                placeholder='Escribí tu contraseña'
                key={'password'}
                value={values.password}
                label='Contraseña'
                onBlur={() => handleTextInputBlur('password')}
                onFocus={() => setFieldTouched('password', true)}
                onChangeText={handleChange('password')}
                keyboardType='ascii-capable'
              ></AppFormInputSecureTextEntry>
            </View>
            <KeyboardAwareScrollView>
              <View style={utilityStyles.contentContainer}>
                <ButtonContainer isLandscape={false}>
                  <AppButton onPress={submitForm}>
                    <AppButtonText>Ingresar</AppButtonText>
                  </AppButton>
                </ButtonContainer>
              </View>
            </KeyboardAwareScrollView>
          </View>
        );
      }}
    </AppForm>
  );
};

export default SignIn;
