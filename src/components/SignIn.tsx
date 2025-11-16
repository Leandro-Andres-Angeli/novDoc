import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PUBLIC_NAVIGATOR_ROUTES from 'src/navigators/publicNavigator/PUBLIC_NAVIGATOR_ROUTES';
import { publicNavigatorRootStack } from 'src/navigators/publicNavigator/PublicNavigator';

import styled from 'styled-components/native';
import AppHeader from '../ui/AppHeader';
import CardImage from '@ui/AppCardImage';
import AppButton from '@ui/AppButton';
import AppButtonText from '@ui/AppButtonText';
import AppTitle from '../ui/AppTitle';
import AppSubtitle from '@ui/AppSubtitle';
import AppForm from './form/AppForm';
import * as Yup from 'yup';
import SignInScreen from '../screens/SignInScreen';
import utilityStyles from 'src/styles/utilityStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { AppFormInput, AppFormInputSecureTextEntry } from '../ui/AppFormInputs';

const Container = styled.View`
  flex: 1;
  background-color: #f7fafc;
`;

const MainContent = styled.View<{ isLandscape: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: ${(props) => (props.isLandscape ? '16px' : '32px')};
  ${(props) => props.isLandscape && 'flex-direction: row;'}
`;

const ContentWrapper = styled.View<{ isLandscape: boolean }>`
  width: 100%;
  max-width: 384px;
  align-items: center;
  ${(props) => props.isLandscape && 'flex: 1; max-width: 50%;'}
`;

const CardContainer = styled.View<{
  isLandscape: boolean;
  screenWidth: number;
}>`
  position: relative;
  width: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.35 : props.screenWidth * 0.7}px;
  height: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.35 : props.screenWidth * 0.7}px;
  margin-bottom: ${(props) => (props.isLandscape ? '16px' : '32px')};
`;

const Footer = styled.View<{ isLandscape: boolean }>`
  padding-horizontal: 16px;
  padding-bottom: ${(props) => (props.isLandscape ? '16px' : '32px')};
  padding-top: 16px;
  gap: 8px;
  ${(props) =>
    props.isLandscape &&
    'flex-direction: row; justify-content: center; align-items: center;'}
`;

const ButtonContainer = styled.View<{ isLandscape: boolean }>`
  width: ${(props) => (props.isLandscape ? 'auto' : '100%')};
  max-width: 448px;
  align-self: center;
  ${(props) => props.isLandscape && 'margin-right: 16px;'}
`;

const TextWrapper = styled.View<{ isLandscape: boolean }>`
  ${(props) =>
    props.isLandscape && 'flex: 1; max-width: 100%; padding-left: 32px;'}
`;

const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<publicNavigatorRootStack>>();
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
  async function handleSubmit(values: ISignInForm) {}

  return (
    <AppForm<ISignInForm>
      validationSchema={formValidationSchema}
      handleSubmit={handleSubmit}
      formFields={signInForm}
    >
      {(props) => {
        const { handleTextInputBlur, values, setFieldTouched, handleChange } =
          props;
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
                label='Nombre'
                onBlur={() => handleTextInputBlur('email')}
                onFocus={() => setFieldTouched('email', true)}
                onChangeText={handleChange('email')}
                keyboardType='ascii-capable'
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
                  <AppButton
                    onPress={() =>
                      navigation.navigate(PUBLIC_NAVIGATOR_ROUTES.SIGN_UP, {})
                    }
                  >
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
