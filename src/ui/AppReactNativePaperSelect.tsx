import React, { useEffect, useState } from 'react';
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
    'multiEnable' | 'selectedArrayList' | 'arrayList' | 'onSelection' | 'value'
  > {
  list: ListItem[];
  selectedList: ListItem[];
  handleSelectedListChange: (val: ListItem[]) => void;
}
export const AppReactNativePaperSelectMultiple = (
  props: ReactNativePaperSelectMultipleProps
) => {
  const { ...defaultProps } = props;

  // const [selectedList, setSelectedList] = useState<{
  //   value: string | undefined;
  //   list: ListItem[];
  //   selectedList: ListItem[];
  //   error: string;
  // }>({
  //   value: undefined,
  //   list: props.list,
  //   selectedList: props.selectedList,
  //   error: '',
  // });
  // useEffect(() => {
  //   console.log('rendering ');
  //   props.handleSelectedListChange(selectedList.selectedList);
  // }, [selectedList.selectedList]);

  const handleList = (val: SelectedItem) => {
    props.handleSelectedListChange(val.selectedList);
    // setSelectedList((prev) => ({
    //   ...prev,
    //   value: val.text,
    //   error: '',
    //   selectedList: val.selectedList,
    // }));
  };
  const displayValue =
    props.selectedList.map((item) => item.value).join(', ') ?? '';
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
        selectedArrayList={props.selectedList}
        value={displayValue}
        arrayList={[...props.list]}
        dialogCloseButtonText='Cancelar'
        dialogDoneButtonText='Ok'
      ></PaperSelect>
    </>
  );
};

export default AppReactNativePaperSelect;
