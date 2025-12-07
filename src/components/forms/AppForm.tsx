import React from 'react';

import { FormikHelpers, FormikProps, FormikValues, useFormik } from 'formik';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';
export interface FormChildrenProps<T> extends FormikProps<T> {
  handleInputValue: <K extends keyof T>(key: K, value: T[K]) => void;
  handleTextInputBlur: (key: keyof T) => void;
  loadingPostIndicator?: boolean;
}
export interface AppFormProps<T> extends FormikValues {
  handleSubmit: (values: any, helpers: FormikHelpers<any>) => Promise<void>;
  formFields: T;
  validationSchema?: Yup.Schema<T>;
  loadingPostIndicator?: boolean;
  children: (props: FormChildrenProps<T>) => React.ReactNode;
}
function AppForm<T extends FormikValues>({
  handleSubmit,
  formFields,
  validationSchema,
  loadingPostIndicator,

  children,
}: AppFormProps<T>) {
  const formikProps = useFormik({
    initialValues: formFields,
    validationSchema,
    onSubmit: (values: T, helpers: FormikHelpers<any>) =>
      handleSubmit(values, helpers),
  });

  const handleInputValue = <K extends keyof T>(key: K, value: T[K]) => {
    formikProps.setFieldValue(key.toString(), value);
  };
  const handleTextInputBlur = (key: keyof T) => {
    formikProps.handleBlur(key);
    Keyboard.dismiss();
  };

  const allProps = {
    ...formikProps,
    loadingPostIndicator,
    handleInputValue,
    handleTextInputBlur,
  } as FormChildrenProps<T>;
  return <>{children(allProps)}</>;
}

export default AppForm;
