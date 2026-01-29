import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import AppLoading from '@ui/AppLoading';
import NoSkillsOnProfile from '@components/private/professional/NoSkillsOnProfile';
import NoResultsForSkills from '@components/private/professional/NoResultsForSkills';
import { ProfessionalContext } from 'src/appContext/professionalContext/ProfessionalContext';
import { jobPostingStatus } from 'src/types/dbTypes/IJobOffer';

const SwipeProfessional = () => {
  const {
    authState: { user },
    loading,
  } = useContext(AuthContext);
  // const { jobPostings } = useContext(ProfessionalContext);
  // const { jobPostings } = useContext(ProfessionalContext);
  const {
    loadJobPostings,
    loading: loadingJobPostings,
    jobPostings,
    errors,
    hasMore,
  } = useContext(ProfessionalContext);
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

  //HARDCODING NO SETUP SKILLS FOR INQUIRING USER TO FILL HIS SKILLS

  if (jobPostings.length === 0) {
    return <NoResultsForSkills></NoResultsForSkills>;
  }
  useEffect(() => {
    loadJobPostings(jobPostingStatus.ACTIVE);
  }, []);

  return (
    <View>
      <Text>SwipeProfessional</Text>
      <Text>{JSON.stringify(jobPostings)}</Text>
    </View>
  );
};

export default SwipeProfessional;
