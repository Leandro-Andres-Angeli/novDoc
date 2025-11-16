import { View, Image } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IRecruiter } from 'src/types/authContextTypes/authContextTypes';
import utilityStyles from 'src/styles/utilityStyles';
import AuthContextProvider, { AuthContext } from 'src/appContext/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { bottomNavigationsOptions } from '@utils/styling/bottomNavigationOptions';
import { StyleSheet } from 'react-native';
import AppHeader from '@ui/AppHeader';
import AppTitle from '@ui/AppTitle';
import NoJobsPosted from 'src/components/private/NoJobsPosted';

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
const Onboarding = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Recruiter</Text>
  </View>
);
const Test = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Test</Text>
  </View>
);
const Add = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Test</Text>
  </View>
);
const Acc = () => (
  <View style={{ ...utilityStyles.flex }}>
    <Text>Test</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const RecruiterNavigator = () => {
  const user = useContext(AuthContext).authState.user as IRecruiter;
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <View>
            <Text>Def</Text>
          </View>
        ),
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

            header: () => (
              <AppHeader logo={false} styles={{ justifyContent: 'center' }}>
                <Text variant='titleMedium'>Mis Publicaciones de Trabajo</Text>
              </AppHeader>
            ),
            headerShown: true,
          };
        }}
        name='SwipeRecruiter'
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
        name='Test'
        component={Test}
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
        name='Acc'
        component={Acc}
      ></Tab.Screen>
      <Tab.Screen
        options={(props) =>
          bottomNavigationsOptions({
            ...props,
            iconName: 'plus-circle',
            iconNameFocused: 'plus-circle-outline',
            tabBarLabel: 'Publicar Oferta',
            theme: theme,
          })
        }
        name='Add'
        component={Add}
      ></Tab.Screen>
    </Tab.Navigator>
  );
  /*  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={function () {
          return {
            tabBarIcon: () => (
              <IconButton
                iconColor={theme.colors.onPrimary}
                icon={'account-group'}
              ></IconButton>
            ),
            tabBarLabel: 'Descrubrir',
            tabBarLabelStyle: { color: theme.colors.onPrimary },
            tabBarActiveBackgroundColor: theme.colors.primary,
          };
        }}
        name='Onboarding'
        component={Onboarding}
      ></Tab.Screen>
      <Tab.Screen
        options={function () {
         
          return {
            tabBarIcon: ({ focused }) => (
              <IconButton
                iconColor={
                  focused ? theme.colors.onPrimary : theme.colors.primary
                }
                icon={'account-group'}
              ></IconButton>
            ),
            tabBarLabel: 'Test',
            tabBarLabelStyle: { color: theme.colors.primary },
            tabBarActiveTintColor: theme.colors.onPrimary,
            tabBarActiveBackgroundColor: theme.colors.primary,
          };
        }}
        name='Test'
        component={Test}
      ></Tab.Screen>
    </Tab.Navigator>
  ); */
};

export default RecruiterNavigator;
