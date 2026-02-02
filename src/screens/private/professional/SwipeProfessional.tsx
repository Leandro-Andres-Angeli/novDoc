import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import AppLoading from '@ui/AppLoading';
import NoSkillsOnProfile from '@components/private/professional/NoSkillsOnProfile';
import NoResultsForSkills from '@components/private/professional/NoResultsForSkills';
import { ProfessionalContext } from 'src/appContext/professionalContext/ProfessionalContext';

import utilityStyles from 'src/styles/utilityStyles';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import SwipeJobPostingCard from '@components/jobPostingCard/SwipeJobPostingCard';

const SwipeProfessional = () => {
  const {
    authState: { user },
    loading: authLoading,
  } = useContext(AuthContext);

  const {
    loadJobPostings,
    loading: loadingJobPostings,
    jobPostings,
    error,
    hasMore,
  } = useContext(ProfessionalContext);

  if (user?.role !== Role.PROFESSIONAL) {
    throw Error('Wrong kind of user');
    return <></>;
  }

  if (!user.skills || user.skills.length === 0) {
    return <NoSkillsOnProfile></NoSkillsOnProfile>;
  }

  // const handleLoadJobPostingsForSkills = useCallback(() => {
  //   console.log('firing use callback');
  //   return loadJobPostings(false, true);
  // }, [user.skills]);

  useEffect(() => {
    loadJobPostings(false, true);
  }, [user.skills]);
  if (jobPostings.length === 0 && !loadingJobPostings) {
    return <NoResultsForSkills></NoResultsForSkills>;
  }
  if (authLoading || loadingJobPostings) {
    return <AppLoading></AppLoading>;
  }
  return (
    <View style={{ ...utilityStyles.flex }}>
      {/* <Text>SwipeProfessional</Text>
      <Text>LENGTH {jobPostings.length}</Text>
      <Text>user skills {JSON.stringify(user.skills)}</Text>
      <Text>{JSON.stringify(loadingJobPostings)}</Text> */}

      <View style={{ ...utilityStyles.flex }}>
        <Carousel
          width={500}
          style={{
            minHeight: '100%',
          }}
          data={jobPostings}
          renderItem={({ item, index }) => {
            return (
              <SwipeJobPostingCard
                jobPosting={item}
                key={index}
              ></SwipeJobPostingCard>
            );
          }}
        ></Carousel>
      </View>
    </View>
  );
};

export default SwipeProfessional;
