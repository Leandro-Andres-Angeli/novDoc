import { View, Text } from 'react-native';
import React from 'react';

import styled from 'styled-components/native';
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

const LogoIcon = styled.Text`
  font-size: 28px;
  color: #2d3748;
`;
const AppHeader = () => {
  return (
    <Header>
      <HeaderContent>
        <LogoIcon>{'</>'}</LogoIcon>
        <LogoText style={{ zIndex: 9 }}>MatchApp</LogoText>
      </HeaderContent>
    </Header>
  );
};

export default AppHeader;
