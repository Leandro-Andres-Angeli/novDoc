import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import { IRecruiter } from 'src/types/authContextTypes/authContextTypes';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/authContext/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import { bottomNavigationsOptions } from '@utils/styling/bottomNavigationOptions';
import NoJobsPosted from '@components/private/recruiter/NoJobsPosted';
import RECRUITER_NAVIGATOR_ROUTES from './RECRUITER_NAVIGATOR_ROUTES';
import { RecruiterContext } from 'src/appContext/recruiterContext/RecruiterContext';
import AppLoading from '@ui/AppLoading';
import AppHeaderWithSettingsLink from '@components/shared/AppHeaderWithSettingsLink';
import RecruiterProfileDrawer from 'src/screens/private/recruiter/RecruiterProfileDrawer';
import { CustomTheme } from 'src/providers/PublicProviders';

import NewjobPostingscreen from 'src/screens/private/recruiter/NewJobOfferScreen';
import { CommonActions } from '@react-navigation/native';
import NoCandidates from '@components/private/recruiter/NoCandidates';

const recruiterNoJobsPosted = (user: IRecruiter) => {
  return user?.jobs?.length === 0 || !user.jobs;
};
const SwipeRecruiter = () => {
  const user = useContext(AuthContext).authState.user as IRecruiter;

  const noJobsPosted = recruiterNoJobsPosted(user);
  const {
    jobPostings,
    loading,
    checkIsLoadingData,
    checkJobPostingsByUsersLength,
    hasJobPostings,
  } = useContext(RecruiterContext);
  useEffect(() => {
    checkJobPostingsByUsersLength();
  }, []);

  if (checkIsLoadingData()) {
    return <AppLoading></AppLoading>;
  }
  // return (
  //   <View>
  //     <Text>{JSON.stringify(jobPostings)}</Text>
  //   </View>
  // );

  if (!checkIsLoadingData() && !hasJobPostings) {
    return <NoJobsPosted></NoJobsPosted>;
  }
  //HARDCODING NO CANDIDATES FOR JOB POSTINGS
  return <NoCandidates></NoCandidates>;
  //HARDCODING NO CANDIDATES FOR JOB POSTINGS
  return (
    <View>
      <Text>Ofertas</Text>
    </View>
  );
};

const Favorites = () => {
  const { loading: loadingjobPostings, jobPostings } =
    useContext(RecruiterContext);
  if (loadingjobPostings) {
    return <AppLoading></AppLoading>;
  }

  return (
    <View style={{ ...utilityStyles.flex }}>
      <Text>Test</Text>
      {/* <Text>
        {JSON.stringify(
          jobPostings.activa.map((el) => ({
            ...el,
            createdAt: el.createdAt.toDate().toLocaleDateString(languageTag),
          }))
        )}
      </Text> */}
    </View>
  );
};

export type RecruiterNavigatorRootParams = {
  [RECRUITER_NAVIGATOR_ROUTES.SWIPE]: {};
  [RECRUITER_NAVIGATOR_ROUTES.PROFILE]: {};
  [RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS]: {};
  [RECRUITER_NAVIGATOR_ROUTES.CHAT_ROOMS]: {};
  [RECRUITER_NAVIGATOR_ROUTES.FAVORITES]: {};
};
const Tab = createBottomTabNavigator<RecruiterNavigatorRootParams>();

const RecruiterNavigator = () => {
  const theme = useTheme<CustomTheme>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarIconStyle: { color: 'red' },
        sceneStyle: {
          backgroundColor: theme.colors.primaryDynamicOpacity(0.04),
        },
        animation: 'shift',
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          theme={theme}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24,
            }) || null
          }
          activeColor={theme.colors.primary}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];

            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : typeof options.title === 'string'
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        options={{
          headerShown: true,
          header: () => (
            <AppHeaderWithSettingsLink title='Postulaciones'></AppHeaderWithSettingsLink>
          ),
          title: 'Postulaciones',
          tabBarLabel: 'Descubrir',

          tabBarIcon: (props) => {
            return (
              <Icon
                theme={theme}
                size={24}
                color={theme.colors.primary}
                source={
                  !props.focused ? 'account-group-outline' : 'account-group'
                }
              ></Icon>
            );
          },
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.SWIPE}
        component={SwipeRecruiter}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,

          tabBarLabel: 'Favoritos',

          tabBarIcon: (props) => {
            return (
              <Icon
                theme={theme}
                size={24}
                color={theme.colors.primary}
                source={!props.focused ? 'heart-outline' : 'heart'}
              ></Icon>
            );
          },
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.FAVORITES}
        component={Favorites}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,

          tabBarLabel: 'Mi perfil',

          tabBarIcon: (props) => {
            return (
              <Icon
                theme={theme}
                size={24}
                color={theme.colors.primary}
                source={
                  !props.focused ? 'account-circle-outline' : 'account-circle'
                }
              ></Icon>
            );
          },
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.PROFILE}
        component={RecruiterProfileDrawer}
      ></Tab.Screen>
      <Tab.Screen
        options={(props) => {
          return {
            title: 'Publicar Oferta',
            headerShown: true,
            headerLeft() {
              return (
                <IconButton
                  onPress={() => props.navigation.goBack()}
                  icon={'chevron-left'}
                ></IconButton>
              );
            },
            tabBarLabel: 'Publicar Oferta',

            tabBarIcon: (props) => {
              return (
                <Icon
                  theme={theme}
                  size={24}
                  color={theme.colors.primary}
                  source={
                    !props.focused ? 'plus-circle-outline' : 'plus-circle'
                  }
                ></Icon>
              );
            },
          };
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS}
        component={NewjobPostingscreen}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default RecruiterNavigator;
