import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { CustomTheme } from 'src/providers/PublicProviders';

const materialBottomTabBar = ({
  navigation,
  state,
  descriptors,
  insets,
  theme,
}: BottomTabBarProps & { theme: CustomTheme }) => {
  return (
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
  );
};

export default materialBottomTabBar;
