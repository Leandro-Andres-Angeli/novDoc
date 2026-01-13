import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import {
  ListItem,
  PaperSelectProps,
  SelectedItem,
} from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';

// Example of impl
interface ReactNativePaperSelectProps<T = string> extends PaperSelectProps {}
const AppReactNativePaperSelect = <T,>(
  props: ReactNativePaperSelectProps<T>
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
  extends Omit<
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
  handleSelectedListChange: (val: ListItem[]) => void;
}
export const AppReactNativePaperSelectMultiple = (
  props: ReactNativePaperSelectMultipleProps
) => {
  const { ...defaultProps } = props;

  const handleList = (val: SelectedItem) => {
    props.handleSelectedListChange(val.selectedList);
  };
  let displayValue =
    (props.selectedList.length > 0 &&
      props.selectedList.map((item) => item.value).join(',')) ||
    'Skills';
  const theme = useTheme();
  return (
    <>
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
    </>
  );
};

export default AppReactNativePaperSelect;
