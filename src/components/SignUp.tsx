import React, { useState } from 'react';
import ReactNativePaperSelect from '../ui/ReactNativePaperSelect';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  SegmentedButtons,
  Avatar,
  Text,
  useTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import { Role, rolesList } from 'src/types/authContextTypes/userRole';

// Custom theme configuration
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#137fec',
    background: '#f6f7f8',
    surface: '#e2e8f0',
    surfaceVariant: '#e2e8f0',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#137fec',
    background: '#101922',
    surface: '#1e293b',
    surfaceVariant: '#1e293b',
  },
};

const SignUp = () => {
  const colorScheme = useColorScheme();

  //   const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const theme = useTheme();

  const [roleValue, setRoleValue] = useState('developer');
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleUploadPhoto = () => {
    console.log('Upload photo');
  };

  const handleNext = () => {
    console.log('Next: Skills');
  };
  const f = (val: any) => {};

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ReactNativePaperSelect<string>
            theme={theme}
            hideSearchBox={true}
            onSelect={f}
            dialogStyle={{ backgroundColor: theme.colors.background }}
            checkboxProps={{
              checkboxColor: theme.colors.primary,
            }}
            label='Perfil'
            dialogDoneButtonText='Ok'
            dialogCloseButtonText='Cancelar'
            multiEnable={false}
            onSelection={() => {}}
            selectedArrayList={[]}
            arrayList={rolesList.map((val) => ({ _id: val, value: val }))}
            value={''}
          ></ReactNativePaperSelect>
          {/* Segmented Buttons */}

          <View style={styles.segmentedContainer}>
            <SegmentedButtons
              value={roleValue}
              onValueChange={setRoleValue}
              buttons={[
                {
                  value: 'developer',
                  label: "I'm a Developer",
                  style: { backgroundColor: theme.colors.surface },
                },
                {
                  value: 'recruiter',
                  label: "I'm a Recruiter",
                  style: { backgroundColor: theme.colors.surface },
                },
              ]}
              style={{ backgroundColor: theme.colors.surface }}
            />
          </View>

          <View style={styles.contentContainer}>
            {/* Section Header */}
            <Text variant='headlineSmall' style={styles.sectionHeader}>
              Basic Information
            </Text>

            {/* Profile Picture Upload */}
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureLeft}>
                <Avatar.Icon
                  size={40}
                  icon='account'
                  style={{ backgroundColor: theme.colors.surface }}
                />
                <Text variant='bodyLarge'>Profile Picture</Text>
              </View>
              <Button
                mode='contained-tonal'
                onPress={handleUploadPhoto}
                style={styles.uploadButton}
                contentStyle={styles.uploadButtonContent}
              >
                Upload
              </Button>
            </View>

            {/* Text Input Fields */}
            <View style={styles.inputsContainer}>
              <TextInput
                label='Full Name'
                value={fullName}
                onChangeText={setFullName}
                placeholder='e.g. Jane Doe'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='Headline'
                value={headline}
                onChangeText={setHeadline}
                placeholder='e.g. Senior iOS Engineer'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='Location'
                value={location}
                onChangeText={setLocation}
                placeholder='e.g. San Francisco, CA'
                mode='flat'
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />

              <TextInput
                label='About Me'
                value={aboutMe}
                onChangeText={setAboutMe}
                placeholder='Tell us a little about yourself...'
                mode='flat'
                multiline
                numberOfLines={4}
                style={[
                  styles.input,
                  styles.textArea,
                  { backgroundColor: theme.colors.surface },
                ]}
                activeUnderlineColor={theme.colors.primary}
                underlineColor='transparent'
              />
            </View>

            {/* Bottom spacing for button */}
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <View
          style={[
            styles.fabContainer,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(16, 25, 34, 0.95)'
                  : 'rgba(246, 247, 248, 0.95)',
            },
          ]}
        >
          <Button
            mode='contained'
            onPress={handleNext}
            style={styles.fab}
            contentStyle={styles.fabContent}
            labelStyle={styles.fabLabel}
          >
            Next: Skills
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  segmentedContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionHeader: {
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 4,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  profilePictureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  uploadButton: {
    borderRadius: 8,
  },
  uploadButtonContent: {
    height: 32,
    paddingHorizontal: 8,
  },
  inputsContainer: {
    gap: 16,
  },
  input: {
    borderRadius: 8,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  fab: {
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabContent: {
    height: 48,
  },
  fabLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignUp;
