import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { MD3Theme, IconButton, Text } from 'react-native-paper';

export const bottomNavigationsOptions: (props: {
  route: RouteProp<ParamListBase, any>;
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
  theme: MD3Theme;
  tabBarLabel: string;
  iconName: string;
  iconNameFocused?: string;
}) => BottomTabNavigationOptions = function (props) {
  const { theme } = props;
  return {
    tabBarIcon: ({ focused }) => (
      <IconButton
        iconColor={focused ? theme.colors.onPrimary : theme.colors.primary}
        icon={
          focused && props.iconNameFocused
            ? props.iconNameFocused
            : props.iconName
        }
      ></IconButton>
    ),
    tabBarLabel: ({ focused }) => (
      <Text
        variant='labelSmall'
        style={{
          color: focused ? theme.colors.onPrimary : theme.colors.primary,
        }}
      >
        {props.tabBarLabel}
      </Text>
    ),

    tabBarActiveTintColor: theme.colors.onPrimary,

    tabBarActiveBackgroundColor: theme.colors.primary,
  };
};
