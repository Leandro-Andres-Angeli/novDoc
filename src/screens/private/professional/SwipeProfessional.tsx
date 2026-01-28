import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import AppLoading from '@ui/AppLoading';
import NoSkillsOnProfile from '@components/private/professional/NoSkillsOnProfile';
import NoResultsForSkills from '@components/private/professional/NoResultsForSkills';

const SwipeProfessional = () => {
  const {
    authState: { user },
    loading,
  } = useContext(AuthContext);
  if (loading) {
    return <AppLoading></AppLoading>;
  }

  if (user?.role !== Role.PROFESSIONAL) {
    throw Error('Wrong kind of user');
    return <></>;
  }
  //HARDCODING NO SETUP SKILLS FOR INQUIRING USER TO FILL HIS SKILLS
  if (!user.skills || user.skills.length === 0) {
    return <NoSkillsOnProfile></NoSkillsOnProfile>;
  }
  return <NoSkillsOnProfile></NoSkillsOnProfile>;
  //HARDCODING NO SETUP SKILLS FOR INQUIRING USER TO FILL HIS SKILLS

  //HARDCODING NO JOBPOSTINGS MATCHING SKILLSET
  const noMatchingSkills = true;
  if (noMatchingSkills) {
    return <NoResultsForSkills></NoResultsForSkills>;
  }
  //HARDCODING NO JOBPOSTINGS MATCHING SKILLSET
  return (
    <View>
      <Text>SwipeProfessional</Text>
    </View>
  );
};

export default SwipeProfessional;
