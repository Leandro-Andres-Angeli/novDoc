import { View, Text, TextProps } from 'react-native';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
const Title = styled.Text<{ isLandscape: boolean }>`
  font-size: ${(props) => (props.isLandscape ? '28px' : '32px')};
  font-weight: 800;
  color: #0a2540;
  text-align: center;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
  margin-top: ${(props) => (props.isLandscape ? '0px' : '24px')};
  line-height: ${(props) => (props.isLandscape ? '36px' : '40px')};
`;
const AppTitle = (
  props: TextProps & PropsWithChildren & { isLandscape?: boolean }
) => {
  return (
    <Title {...props} isLandscape={props.isLandscape ?? false}>
      {props.children}
    </Title>
  );
};

export default AppTitle;
