import { View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { IRecruiter } from 'src/types/authContextTypes/authContextTypes';
import utilityStyles from 'src/styles/utilityStyles';
import { AuthContext } from 'src/appContext/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { bottomNavigationsOptions } from '@utils/styling/bottomNavigationOptions';

import AppHeader from '@ui/AppHeader';

import NoJobsPosted from 'src/components/private/NoJobsPosted';
import RECRUITER_NAVIGATOR_ROUTES from './RECRUITER_NAVIGATOR_ROUTES';

import NewJobOfferScreen from 'src/screens/private/recruiter/NewJobOfferScreen';
import { RecruiterContext } from 'src/appContext/RecruiterContext';

import AppLoading from '@ui/AppLoading';
import RecruiterProfileScreen from 'src/screens/private/recruiter/RecruiterProfileScreen';
import { getLocales } from 'expo-localization';

const recruiterNoJobsPosted = (user: IRecruiter) => {
  return user?.jobs?.length === 0 || !user.jobs;
};
const SwipeRecruiter = () => {
  const user = useContext(AuthContext).authState.user as IRecruiter;

  const noJobsPosted = recruiterNoJobsPosted(user);

  if (noJobsPosted) {
    return <NoJobsPosted></NoJobsPosted>;
  }
  return (
    <View>
      <Text>Ofertas</Text>
    </View>
  );
};

const Favorites = () => {
  const { loading: loadingJobOffers, jobOffers } = useContext(RecruiterContext);
  if (loadingJobOffers) {
    return <AppLoading></AppLoading>;
  }
  const [{ languageTag }] = getLocales();
  console.log('lang', languageTag);
  return (
    <View style={{ ...utilityStyles.flex }}>
      <Text>Test</Text>
      <Text>
        {' '}
        {JSON.stringify(
          jobOffers.map((el) => ({
            ...el,
            createdAt: el.createdAt.toDate().toLocaleDateString(languageTag),
          }))
        )}{' '}
      </Text>
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
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tab.Screen
        options={(props) => {
          const iconOptions = bottomNavigationsOptions({
            ...props,
            iconName: 'account-group-outline',
            iconNameFocused: 'account-group',
            tabBarLabel: 'Descubrir',
            theme: theme,
          });
          return {
            ...iconOptions,

            header: () => {
              return (
                <View
                  style={{
                    ...utilityStyles.row,
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  <AppHeader
                    logo={false}
                    styles={{
                      justifyContent: 'center',
                      marginLeft: '34%',
                      marginRight: 'auto',
                    }}
                  >
                    <Text variant='titleMedium'>Postulaciones</Text>
                  </AppHeader>
                  <View
                    style={{
                      ...utilityStyles.row,
                      position: 'relative',
                      right: 0,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}
                  >
                    <IconButton icon={'cog-outline'}></IconButton>
                    <IconButton icon={'bell-outline'}></IconButton>
                  </View>
                </View>
              );
            },

            headerShown: true,
          };
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.SWIPE}
        component={SwipeRecruiter}
      ></Tab.Screen>
      <Tab.Screen
        options={(props) =>
          bottomNavigationsOptions({
            ...props,
            iconName: 'heart-outline',
            iconNameFocused: 'heart',
            tabBarLabel: 'Favoritos',
            theme: theme,
          })
        }
        name={RECRUITER_NAVIGATOR_ROUTES.FAVORITES}
        component={Favorites}
      ></Tab.Screen>
      <Tab.Screen
        options={(props) =>
          bottomNavigationsOptions({
            ...props,
            iconName: 'account-circle',
            iconNameFocused: 'account-circle-outline',
            tabBarLabel: 'Mi perfil',
            theme: theme,
          })
        }
        name={RECRUITER_NAVIGATOR_ROUTES.PROFILE}
        component={RecruiterProfileScreen}
      ></Tab.Screen>
      <Tab.Screen
        options={(props) => {
          const iconOptions = bottomNavigationsOptions({
            ...props,
            iconName: 'plus-circle',
            iconNameFocused: 'plus-circle-outline',
            tabBarLabel: 'Publicar Oferta',
            theme: theme,
          });
          return {
            ...iconOptions,
            headerShown: true,
            headerTitle: 'Publicar Oferta',
            headerTitleAlign: 'center',
            headerTitleStyle: { marginRight: 40 },

            headerLeft() {
              return (
                <IconButton
                  onPress={() => props.navigation.goBack()}
                  icon={'chevron-left'}
                ></IconButton>
              );
            },
          };
        }}
        name={RECRUITER_NAVIGATOR_ROUTES.CREATE_JOB_OFFERS}
        component={NewJobOfferScreen}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default RecruiterNavigator;
