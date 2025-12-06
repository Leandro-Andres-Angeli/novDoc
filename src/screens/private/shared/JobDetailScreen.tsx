import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import {
  Appbar,
  Text,
  Chip,
  Avatar,
  Button,
  Divider,
} from 'react-native-paper';
import { ChevronLeft, Edit, Filter } from 'lucide-react-native';
import JobDetail from '../../../components/shared/JobDetail';
import Candidates from '../../../components/private/recruiter/Candidates';

export default function JobDetailsScreen() {
  return (
    <>
      <JobDetail></JobDetail>
      <Candidates></Candidates>
    </>
  );
}
