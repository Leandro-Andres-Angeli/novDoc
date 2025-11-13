import { View, Text } from 'react-native';
import React from 'react';
import { PaperSelect } from 'react-native-paper-select';
import { PaperSelectProps } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import { useTheme } from 'react-native-paper';
interface ReactNativePaperSelectProps<T = string> extends PaperSelectProps {
  onSelect: (key: T) => void;
}
const ReactNativePaperSelect = <T,>(props: ReactNativePaperSelectProps<T>) => {
  const { onSelect, ...defaultProps } = props;

  return <PaperSelect {...defaultProps}></PaperSelect>;
};

export default ReactNativePaperSelect;
