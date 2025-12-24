import UpdatePasswordForm from '@components/forms/UpdatePasswordForm';
import AppButton from '@ui/AppButton';
import AppButtonText from '@ui/AppButtonText';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase/config';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  TextInput,
  Button,
  Text,
  Appbar,
  HelperText,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5B7FFF',
  },
};

export default function PasswordUpdateScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = () => {
    console.log('Updating password...');
  };

  return (
    <UpdatePasswordForm></UpdatePasswordForm>
    /*    <KeyboardAwareScrollView>
      <View
        style={{
          ...utilityStyles.contentContainer,
          backgroundColor: theme.colors.background,
          marginTop: 20,
       marginBottom: 20,
       ...utilityStyles.flex,
        }}
      >
        <Text variant='headlineSmall' style={styles.title}>
          Actualizar Contraseña
        </Text> 

        <Text variant='bodyMedium' style={styles.description}>
          Para mantener tu cuenta segura, te recomendamos actualizar tu
          contraseña regularmente. Una nueva contraseña debe contener al menos 8
          caracteres.
        </Text> 
         
        <View style={styles.form}>
          <Text variant='labelLarge' style={styles.label}>
            Contraseña Actual
          </Text> 
         <TextInput
            mode='outlined'
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            right={
              <TextInput.Icon
                icon={showCurrentPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />  
         <HelperText type='info' style={styles.helperText}>
            ¿Olvidaste tu contraseña?
          </HelperText> 

         <Text variant='labelLarge' style={styles.label}>
            Nueva Contraseña
          </Text> }
         <TextInput
            mode='outlined'
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            placeholder='••••••••'
            right={
              <TextInput.Icon
                icon={showNewPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />  
        <HelperText type='info' style={styles.helperText}>
            Debe tener al menos 8 caracteres, minúscula, mayúscula y números
          </HelperText> 

         <Text variant='labelLarge' style={styles.label}>
            Confirmar Nueva Contraseña
          </Text> 
         <TextInput
            mode='outlined'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder='••••••••'
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
          /> 
      </View>
       <View style={utilityStyles.contentContainer}>
        <AppButton onPress={() => {}}>
          <AppButtonText>Actualizar Contraseña</AppButtonText>
        </AppButton>
      </View> 
       </View> 
    </KeyboardAwareScrollView> */
  );
}
