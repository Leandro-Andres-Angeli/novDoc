import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import { Role } from 'src/types/authContextTypes/userRole';
import styled from 'styled-components/native';

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

            style: { flex: 1 }, // makes both buttons expand equally
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
