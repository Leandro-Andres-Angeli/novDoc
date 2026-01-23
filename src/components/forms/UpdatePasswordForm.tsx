import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import utilityStyles from 'src/styles/utilityStyles';
import AppForm from './AppForm';
import { useTheme } from 'react-native-paper';
import { AppFormInputWithHelper } from '@ui/AppFormInputs';
import AppGenericSubmitBtn from './AppGenericSubmitBtn';

import { useNavigation } from '@react-navigation/native';
import { updateUserPassword } from 'src/services/auth';
import { Toast } from 'toastify-react-native';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import useOpenElement from 'src/hooks/useOpenElement';
import AppModal from '@ui/AppModal';
import AppConfirmModal from '@components/private/recruiter/AppConfirmModal';
export interface UpdatePasswordForm {
  password: string;
  password2: string;
}
const formValidationSchema = Yup.object({
  password: Yup.string()
    .required('campo obligatorio')
    .min(6, 'debe contener al menos 6 caracteres'),
  password2: Yup.string()
    .oneOf(
      [Yup.ref('password'), ''],
      'confirmar contraseña y contraseña deben ser iguales',
    )
    .required('campo obligatorio'),
});

const UpdatePasswordForm = () => {
  const { logout } = useContext(AuthContext);
  const { elementVisible, handleElementVisibility } = useOpenElement();
  const handleUpdatePassword = async (values: UpdatePasswordForm) => {
    const updatePasswordOp = await updateUserPassword(values.password);
    if (!updatePasswordOp.success) {
      handleElementVisibility(true);
      return;
      //   return Toast.error(updatePasswordOp.message);
    }
    return Toast.show({
      text1: updatePasswordOp.message,
      text2: 'Por seguridad sera dirigido a la pantalla de login nuevamente',
      type: 'success',
      onHide() {
        return logout();
      },
    });
  };
  const updatePasswordForm: UpdatePasswordForm = {
    password: '',
    password2: '',
  };
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <AppForm<UpdatePasswordForm>
        validationSchema={formValidationSchema}
        handleSubmit={handleUpdatePassword}
        formFields={updatePasswordForm}
      >
        {(props) => {
          const {
            handleTextInputBlur,
            values,
            setFieldTouched,
            handleChange,
            submitForm,
            touched,
            errors,
            handleSubmit,
            handleBlur,
            loadingPostIndicator,
            dirty,
            isValid,
            handleResetForm,
          } = props;

          useEffect(() => {
            const unsubscribe = navigation.addListener('focus', function () {
              handleResetForm({ password: '', password2: '' });
            });

            return unsubscribe;
          }, []);
          return (
            <View
              style={{
                ...utilityStyles.contentContainer,
                backgroundColor: theme.colors.background,
                marginTop: 20,
                marginBottom: 20,
                ...utilityStyles.flex,
              }}
            >
              <KeyboardAwareScrollView>
                <View
                  style={{
                    ...utilityStyles.contentContainer,
                  }}
                >
                  <View style={utilityStyles.inputsContainer}>
                    <AppFormInputWithHelper<UpdatePasswordForm>
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
                    <AppFormInputWithHelper<UpdatePasswordForm>
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
                  submitTextBtn={'Actualizar Contraseña'}
                ></AppGenericSubmitBtn>
              </View>
            </View>
          );
        }}
      </AppForm>
      <AppModal visible={elementVisible} elementVisible={elementVisible}>
        <AppConfirmModal
          text2='¿Desea cerrar sesión e ingresar nuevamente?'
          handleConfirm={logout}
          handleCancel={() => handleElementVisibility(false)}
        ></AppConfirmModal>
      </AppModal>
    </>
  );
};

export default UpdatePasswordForm;
