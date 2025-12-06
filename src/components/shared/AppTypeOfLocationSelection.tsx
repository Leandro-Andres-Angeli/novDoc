import { View } from 'react-native';
import React, { useState } from 'react';
import utilityStyles from 'src/styles/utilityStyles';
import AppSegmentedButtons from '../AppSegmentedButtons';

export enum LocationSelectionType {
  SELECT_LIST = 'lista',
  MAP = 'mapa',
  CURRENT_USER_LOCATION = 'mi ubicación',
}
interface AppTypeOfLocationSelectionProps {
  children: (props: {
    locationSelectionType: LocationSelectionType;
  }) => React.ReactNode;
}
const AppTypeOfLocationSelection = (props: AppTypeOfLocationSelectionProps) => {
  const appSegmentedButtonsValues = Object.entries(LocationSelectionType).map(
    ([key, value]) => ({
      value: value,
      label: value,
    })
  );
  const [locationSelectionType, setLocationSelectionType] =
    useState<LocationSelectionType>(LocationSelectionType.SELECT_LIST);

  return (
    <View style={[utilityStyles.inputGroup]}>
      <AppSegmentedButtons
        handleChange={(e) => {
          setLocationSelectionType(e);
        }}
        value={locationSelectionType}
        values={appSegmentedButtonsValues}
        defaultValue={locationSelectionType}
      ></AppSegmentedButtons>
      {props.children({ locationSelectionType })}
    </View>
  );
};

export default AppTypeOfLocationSelection;
