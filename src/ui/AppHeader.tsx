import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import React, { PropsWithChildren } from 'react';

import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';

const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;
const LogoText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  letter-spacing: -0.5px;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.Text<{ color?: string }>`
  font-size: 28px;
  color: ${(props) => props.color ?? '#2d3748'};
`;
interface AppHeaderProps extends PropsWithChildren {
  logo?: boolean;
  styles?: StyleProp<ViewStyle>;
}
const AppHeader = ({ logo = true, children, styles }: AppHeaderProps) => {
  const theme = useTheme();

  return (
    <Header style={{ ...StyleSheet.flatten(styles) }}>
      <HeaderContent>
        {logo && (
          <>
            <LogoIcon color={theme.colors.onSurface}>{'</>'}</LogoIcon>
            <LogoText style={{ zIndex: 9 }}>MatchApp</LogoText>
          </>
        )}
        {children && children}
      </HeaderContent>
    </Header>
  );
};

export default AppHeader;
