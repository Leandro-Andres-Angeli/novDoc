import { View, Text } from 'react-native';
import React from 'react';
import AppProfileScreen from '../shared/AppProfileScreen';
import JobApplicationsListTabNavigator from '../../../navigators/privateNavigator/professionalNavigator/jobApplicationsListTabNavigator/JobApplicationsListTabNavigator';

const ProfessionalProfileScreen = () => {
  return (
    <AppProfileScreen>
      <JobApplicationsListTabNavigator></JobApplicationsListTabNavigator>
    </AppProfileScreen>
  );
};

export default ProfessionalProfileScreen;
