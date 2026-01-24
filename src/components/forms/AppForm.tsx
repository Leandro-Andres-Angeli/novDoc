import React, { useEffect } from 'react';

import {
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikValues,
  useFormik,
} from 'formik';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';
export interface FormChildrenProps<T> extends FormikProps<T> {
  handleInputValue: <K extends keyof T>(key: K, value: T[K]) => void;
  handleTextInputBlur: (key: keyof T) => void;
  loadingPostIndicator?: boolean;
  parentProps?: React.ReactNode;
  handleResetForm: (
    values?: T | undefined,
  ) => Promise<void> | Promise<FormikErrors<T>> | undefined;
}
export interface AppFormProps<T> extends FormikValues {
  handleSubmit: (values: any, helpers: FormikHelpers<any>) => Promise<void>;
  formFields: T;
  validationSchema?: Yup.Schema<T>;
  loadingPostIndicator?: boolean;
  parentProps?: React.ReactNode;
  children: (props: FormChildrenProps<T>) => React.ReactNode;
  dinaymicParams?: Array<any>;
}
function AppForm<T extends FormikValues>({
  handleSubmit,
  formFields,
  validationSchema,
  loadingPostIndicator,
  parentProps,
  children,
  dinaymicParams = [],
}: AppFormProps<T>) {
  const formikProps = useFormik({
    initialValues: formFields,
    validationSchema,
    enableReinitialize: true,

    onSubmit: (values: T, helpers: FormikHelpers<any>) =>
      handleSubmit(values, helpers),
  });

  const handleResetForm = (values?: T) => {
    if (values) {
      return formikProps.setValues(values);
    }
    formikProps.resetForm();
  };
  const handleInputValue = <K extends keyof T>(key: K, value: T[K]) => {
    formikProps.setFieldValue(key.toString(), value);
  };
  const handleTextInputBlur = (key: keyof T) => {
    formikProps.handleBlur(key);
    Keyboard.dismiss();
  };
  useEffect(() => {}, dinaymicParams);

  const allProps = {
    ...formikProps,
    loadingPostIndicator,
    handleInputValue,
    handleTextInputBlur,
    handleResetForm,
    ...(parentProps && { parentProps }),
  } as FormChildrenProps<T>;
  return <>{children(allProps)}</>;
}

export default AppForm;
