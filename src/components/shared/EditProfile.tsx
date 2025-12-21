import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import AppForm from '@components/forms/AppForm';
import { IRecruiter, IUser } from 'src/types/authContextTypes/authContextTypes';
import * as Yup from 'yup';
import { useTheme } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import { isProfessional, isRecruiter } from '@utils/checkUserType';
import { AppFormInput } from '../../ui/AppFormInputs';
import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';

type UpdateRecruiterProfileFormShape = IUser & Omit<IRecruiter, 'jobs'>;

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

const EditProfile = () => {
  const theme = useTheme();
  const handleSubmit = async () => {};
  const { isVisible } = useKeyboardState();
  const {
    authState: { user },
  } = useContext(AuthContext);
  if (!user) {
    return <></>;
  }
  if (isRecruiter(user)) {
    return (
      <View
        // style={utilityStyles.contentContainer}
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
          validationSchema={editProfileValidationSchema}
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
                        <AppFormInput
                          label='Nombre'
                          formKey={'name'}
                          key={'name'}
                          value={values.name}
                        ></AppFormInput>
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

export default EditProfile;
