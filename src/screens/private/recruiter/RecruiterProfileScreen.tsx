import React from 'react';

import JobsListTabNavigator from '../../../navigators/privateNavigator/recruiterNavigator/jobListTabNavigator/JobsListTabNavigator';

import AppProfileScreen from '../shared/AppProfileScreen';

const RecruiterProfileScreen = () => {
  return (
    <AppProfileScreen>
      <JobsListTabNavigator></JobsListTabNavigator>
    </AppProfileScreen>
  );
};

export default RecruiterProfileScreen;
