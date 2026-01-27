import { View, Text } from 'react-native';
import React from 'react';
export const JOB_APPLICATIONS_LIST_ROUTES = {
  JOB_APPLICATION_DETAIL: 'JOB_APPLICATION_DETAIL',
  JOB_APPLICATION_LIST: 'JOB_APPLICATION_LIST',
} as const;
const JobApplicationsListNavigator = () => {
  return (
    <View>
      <Text>JobApplicationsListNavigator</Text>
    </View>
  );
};

export default JobApplicationsListNavigator;
