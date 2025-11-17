import React from 'react';
import { PaperSelect } from 'react-native-paper-select';
import { PaperSelectProps } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';

// Example of impl
interface ReactNativePaperSelectProps<T = string> extends PaperSelectProps {}
const AppReactNativePaperSelect = <T,>(
  props: ReactNativePaperSelectProps<T>
) => {
  const { ...defaultProps } = props;

  return <PaperSelect {...defaultProps}></PaperSelect>;
};

export default AppReactNativePaperSelect;
