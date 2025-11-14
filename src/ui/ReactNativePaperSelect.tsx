import { View, Text } from 'react-native';
import React from 'react';
import { PaperSelect } from 'react-native-paper-select';
import { PaperSelectProps } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import { useTheme } from 'react-native-paper';
// Example of impl
{
  /*     <View style={{ padding: 15 }}>
              <ReactNativePaperSelect<Role>
                theme={theme}
                hideSearchBox={true}
                textInputStyle={{
                  backgroundColor: theme.colors.background,

                  textTransform: 'capitalize',
                }}
                dialogStyle={{ backgroundColor: theme.colors.background }}
                checkboxProps={{
                  checkboxColor: theme.colors.primary,
                }}
                label='Perfil'
                dialogDoneButtonText='Ok'
                dialogCloseButtonText='Cancelar'
                multiEnable={false}
                onSelection={({ selectedList }) => {
                  const parsed = selectedList.at(0)?.value as Role;

                  handleInputValue('role', parsed);
                }}
                selectedArrayList={[
                  { _id: formik.values.role, value: formik.values.role },
                ]}
                arrayList={rolesList.map((val) => ({ _id: val, value: val }))}
                value={formik.values.role}
              ></ReactNativePaperSelect>
            </View> */
}
{
  /* Segmented Buttons */
}

// Example of impl
interface ReactNativePaperSelectProps<T = string> extends PaperSelectProps {}
const ReactNativePaperSelect = <T,>(props: ReactNativePaperSelectProps<T>) => {
  const { ...defaultProps } = props;

  return <PaperSelect {...defaultProps}></PaperSelect>;
};

export default ReactNativePaperSelect;
