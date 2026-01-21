import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import {
  ListItem,
  PaperSelectProps,
  SelectedItem,
} from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import utilityStyles from 'src/styles/utilityStyles';

// Example of impl
interface ReactNativePaperSelectProps<T = string> extends PaperSelectProps {}
const AppReactNativePaperSelect = <T,>(
  props: ReactNativePaperSelectProps<T>,
) => {
  const { ...defaultProps } = props;

  return (
    <PaperSelect
      {...defaultProps}
      dialogCloseButtonText='Cancelar'
      dialogDoneButtonText='Ok'
    ></PaperSelect>
  );
};
interface ReactNativePaperSelectMultipleProps
  extends
    Omit<
      PaperSelectProps,
      | 'multiEnable'
      | 'selectedArrayList'
      | 'arrayList'
      | 'onSelection'
      | 'value'
    >,
    PropsWithChildren {
  list: ListItem[];
  selectedList: ListItem[];
  displayTitle?: string;
  handleSelectedListChange: (val: ListItem[]) => void;
}
export const AppReactNativePaperSelectMultiple = (
  props: ReactNativePaperSelectMultipleProps,
) => {
  const { ...defaultProps } = props;

  const handleList = (val: SelectedItem) => {
    props.handleSelectedListChange(val.selectedList);
  };
  let displayValue =
    (props.selectedList.length > 0 &&
      props.selectedList.map((item) => item.value).join(',')) ||
    props.displayTitle ||
    'Skills';
  const theme = useTheme();
  return (
    <View style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
      <PaperSelect
        theme={theme}
        dialogStyle={{
          backgroundColor: theme.colors.background,
        }}
        {...defaultProps}
        hideSearchBox={true}
        selectAllText='seleccionar todo'
        multiEnable={true}
        onSelection={handleList}
        selectedArrayList={[...props.selectedList]}
        value={displayValue}
        arrayList={[...props.list]}
        dialogCloseButtonText='Cancelar'
        dialogDoneButtonText='Ok'
      ></PaperSelect>
      {props.children}
    </View>
  );
};

export default AppReactNativePaperSelect;
