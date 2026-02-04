import { Dimensions, View } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
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
  const ref = useRef<SwiperCardRefType>(null);
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

      const opacity = interpolate(
        value,
        [-1, -0.8, 0, 1],
        [0, 0.9, 1, 0.85],
        Extrapolation.EXTEND,
      );

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          { scale },
        ],
        zIndex,
        opacity,
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
    <>
      <View
        style={{
          ...utilityStyles.container,
          ...utilityStyles.flex,

          display: 'flex',
        }}
      >
        <Swiper
          ref={ref}
          keyExtractor={(item) => item.id.toString()}
          data={jobPostings}
          renderCard={(item, index) => (
            <SwipeJobPostingCard
              jobPosting={item}
              key={index}
            ></SwipeJobPostingCard>
          )}
          cardStyle={{ width: '100%', height: '100%' }}
          initialIndex={0}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          // overlayLabelContainerStyle={{ backgroundColor: 'blue' }}
          onIndexChange={(index) => {
            console.log('Current Active index', index);
          }}
          onSwipeRight={(cardIndex) => {
            console.log('cardIndex', cardIndex);
          }}
          onPress={() => {
            console.log('onPress');
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          // FlippedContent={renderFlippedCard}
          onSwipeLeft={(cardIndex) => {
            console.log('onSwipeLeft', cardIndex);
          }}
          onSwipeTop={(cardIndex) => {
            console.log('onSwipeTop', cardIndex);
          }}
          onSwipeBottom={(cardIndex) => {
            console.log('onSwipeBottom', cardIndex);
          }}
          OverlayLabelRight={() => (
            <View>
              <Text>Match</Text>
            </View>
          )}
          OverlayLabelLeft={() => (
            <View>
              <Text>No Match</Text>
            </View>
          )}
          // OverlayLabelTop={OverlayLabelTop}
          // OverlayLabelBottom={OverlayLabelBottom}
          // onSwipeActive={() => {
          //   console.log('onSwipeActive');
          // }}
          onSwipeStart={function () {
            console.log('onSwipeStart');
          }}
          onSwipeEnd={() => {
            console.log('onSwipeEnd');
          }}
        ></Swiper>
      </View>
      <AppSwipeActions
        handleReject={() => ref.current?.swipeLeft()}
        handleMatch={() => ref.current?.swipeRight()}
        handleAddToFavorites={() => ref.current?.swipeTop()}
      ></AppSwipeActions>
    </>
  );
};

export default SwipeProfessional;
