import { Dimensions, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { Role } from 'src/types/authContextTypes/userRole';
import AppLoading from '@ui/AppLoading';
import NoSkillsOnProfile from '@components/private/professional/NoSkillsOnProfile';
import NoResultsForSkills from '@components/private/professional/NoResultsForSkills';
import { ProfessionalContext } from 'src/appContext/professionalContext/ProfessionalContext';

import utilityStyles from 'src/styles/utilityStyles';
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from 'react-native-reanimated-carousel';

import SwipeJobPostingCard from '@components/jobPostingCard/SwipeJobPostingCard';
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import AppSwipeActions from '@components/shared/AppSwipeActions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('screen').width;
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
  const headerHeight = 100;
  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = height - headerHeight;

  const directionAnimVal = useSharedValue(0);

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number, index: number) => {
      'worklet';
      const translateY = interpolate(value, [0, 1], [0, -18]);

      const translateX =
        interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const rotateZ =
        interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const zIndex = -10 * index;

      const scale = interpolate(value, [0, 1], [1, 0.95]);

      // const opacity = interpolate(
      //   value,
      //   [-1, -0.8, 0, 1],
      //   [0, 0.9, 1, 0.85],
      //   Extrapolation.EXTEND,
      // );

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          { scale },
        ],
        zIndex,
        // opacity,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH],
  );
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

      <Carousel
        width={width}
        loop={true}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT * 0.7,
        }}
        onConfigurePanGesture={(g) => {
          console.log('GGG', g);

          g.onChange((e) => {
            'worklet';
            console.log('eee', e);

            // directionAnimVal.value = Math.sign(e.translationX);
            directionAnimVal.value = Math.sign(e.translationX);
          });
        }}
        // fixedDirection='negative'
        defaultIndex={0}
        customAnimation={animationStyle}
        windowSize={5}
        vertical={false}
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

      <AppSwipeActions></AppSwipeActions>
    </View>
  );
};

export default SwipeProfessional;
