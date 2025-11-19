import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

interface AppSegmentButtonProps<T = string> {
  values: { value: T; label: string }[];
  defaultValue: T;
  value: T;
  handleChange: (val: any) => void;
}

export function AppSegmentedButtons({
  defaultValue,
  values,
  value,
  handleChange,
}: AppSegmentButtonProps<string>) {
  // const [value, setValue] = useState(defaultValue);
  // useEffect(() => {
  //   handleChange(value);
  // }, [value]);

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <SegmentedButtons
        value={value}
        onValueChange={handleChange}
        /*   onValueChange={(val) => {
          setValue(val);
        }} */
        buttons={values.map((val) => ({ value: val.value, label: val.label }))}
      />
    </View>
  );
}

export default AppSegmentedButtons;
/* export function AppSegmentedButtons({
  defaultValue,
  values,
  handleChange,
}: AppSegmentButtonProps<string>) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    handleChange(value);
  }, [value]);

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(val) => {
          setValue(val);
        }}
        buttons={values.map((val) => ({ value: val.value, label: val.label }))}
      />
    </View>
  );
}

export default AppSegmentedButtons;
 */
