import * as React from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Role } from 'src/types/authContextTypes/userRole';

export default function RoleSelector({
  defaultValue,
  handleChange,
}: {
  defaultValue: Role.PROFESSIONAL;
  handleChange: (val: any) => void;
}) {
  const [value, setValue] = React.useState<Role>(defaultValue);
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <SegmentedButtons
        value={value}
        onValueChange={(val) => {
          handleChange(val);
          setValue(val);
        }}
        buttons={[
          {
            value: Role.PROFESSIONAL,
            label: 'Soy desarrollador',

            style: { flex: 1 },
          },
          {
            value: Role.RECRUITER,
            label: 'Soy reclutador',
            style: { flex: 1 },
          },
        ]}
      />
    </View>
  );
}
