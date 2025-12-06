import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobPostingNavigation } from '@utils/JobPostingNavigation';
interface JobDetailProps extends NativeStackScreenProps<JobPostingNavigation> {}
const JobDetail = () => {
  return (
    <View>
      <Text>JobDetail Component</Text>
    </View>
  );
};

export default JobDetail;
