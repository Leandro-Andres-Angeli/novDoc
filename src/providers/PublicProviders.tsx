/* import AuthContextProvider from 'src/appContext/authContext/AuthContext';
import merge from 'deepmerge';
import { PropsWithChildren } from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import COLORS from 'src/constants/COLORS';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ToastProvider from 'toastify-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

export type CustomTheme = MD3Theme &
  ReactNavigation.Theme & {
    fonts: { iconFontSize: number };
    colors: { primaryDynamicOpacity: (opacity?: number) => string };
  };
const PublicProviders = ({ children }: PropsWithChildren) => {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme: CustomTheme = {
    ...merge(MD3LightTheme, LightTheme),
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: COLORS.primary,
      primaryDynamicOpacity(opacity = 0.2) {
        return `${COLORS.primary.replace(/1\)/, opacity.toString() + ')')}`;
      },
      secondaryContainer: COLORS.secondaryContainer,

      surfaceVariant: '#f2f1f1ff',
    },
    fonts: {
      ...MD3LightTheme.fonts,
      ...LightTheme.fonts,
      iconFontSize: 20,
    },
  };

  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
  return (
    <AuthContextProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <KeyboardProvider>
            <ToastProvider>
              <SafeAreaView
                edges={['right', 'left', 'top']}
                style={{ height: Dimensions.get('window').height, flex: 1 }}
              >
                {children}
              </SafeAreaView>
            </ToastProvider>
          </KeyboardProvider>
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
  );
};
export default PublicProviders;
 */

import { PropsWithChildren } from 'react';

import { Dimensions } from 'react-native';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

import { PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from 'src/constants/COLORS';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import AuthContextProvider from 'src/appContext/authContext/AuthContext';
// import PublicProviders from 'src/providers/PublicProviders';

export type CustomTheme = MD3Theme &
  ReactNavigation.Theme & {
    fonts: { iconFontSize: number };
    colors: { primaryDynamicOpacity: (opacity?: number) => string };
  };
const PublicProviders = ({ children }: PropsWithChildren) => {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme: CustomTheme = {
    ...merge(MD3LightTheme, LightTheme),
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: COLORS.primary,
      primaryDynamicOpacity(opacity = 0.2) {
        return `${COLORS.primary.replace(/1\)/, opacity.toString() + ')')}`;
      },
      secondaryContainer: COLORS.secondaryContainer,

      surfaceVariant: '#f2f1f1ff',
    },
    fonts: {
      ...MD3LightTheme.fonts,
      ...LightTheme.fonts,
      iconFontSize: 20,
    },
  };

  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
  return (
    <AuthContextProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <KeyboardProvider>
            <ToastProvider>
              <SafeAreaView
                edges={['right', 'left', 'top']}
                style={{ height: Dimensions.get('window').height, flex: 1 }}
              >
                {children}
              </SafeAreaView>
            </ToastProvider>
          </KeyboardProvider>
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
  );
};
export default PublicProviders;
