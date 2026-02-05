import { Dimensions, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import AppSwipeActions from '@components/shared/AppSwipeActions';
import { Text } from 'react-native-paper';
import { useScrollToTop } from '@react-navigation/native';
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const ref = useRef<ICarouselInstance>(null);

  const PAGE_WIDTH = Dimensions.get('window').width;

  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-15, 0, 15])}deg`;

    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH],
    );
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{ scale }, { rotateZ }, { translateX }],
      zIndex,
      opacity,
    };
  }, []);

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
    <>
      <View
        style={{
          ...utilityStyles.container,
          ...utilityStyles.flex,

          display: 'flex',

          ...{
            width: PAGE_WIDTH,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <Carousel
          width={width}
          loop={true}
          ref={ref}
          // keyExtractor={(item) => item.id.toString()}
          style={{
            ...utilityStyles.flex,
          }}
          vertical={false}
          data={jobPostings}
          customAnimation={animationStyle}
          onConfigurePanGesture={(g) => {
            g.activeOffsetX([-10, 10]);
          }}
          onSnapToItem={(e) => {
            setCurrentIndex(e);
          }}
          renderItem={({ item, index }) => (
            <SwipeJobPostingCard
              jobPosting={item}
              key={index}
              currentIndex={currentIndex}
            ></SwipeJobPostingCard>
          )}
        ></Carousel>
      </View>
      <AppSwipeActions
        handleReject={() => ref.current?.next()}
        handleMatch={() => ref.current?.next()}
        handleAddToFavorites={() => ref.current?.next()}
        style={{
          zIndex: 2,
          position: 'absolute',
          bottom: 0,
          left: width / 2,
          right: width / 2,
        }}
      ></AppSwipeActions>
    </>
  );
};

export default SwipeProfessional;
