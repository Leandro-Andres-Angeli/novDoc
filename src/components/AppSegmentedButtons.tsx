import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

interface AppSegmentButtonProps<T = string> {
  values: { value: T; label: string }[];
  defaultValue: T;
  handleChange: (val: any) => void;
}

export function AppSegmentedButtons({
  defaultValue,
  values,
  handleChange,
}: AppSegmentButtonProps<string>) {
  const [value, setValue] = useState(defaultValue);
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(val) => {
          handleChange(val);
          setValue(val);
        }}
        buttons={values.map((val) => ({ value: val.value, label: val.label }))}
      />
    </View>
  );
}

export default AppSegmentedButtons;
