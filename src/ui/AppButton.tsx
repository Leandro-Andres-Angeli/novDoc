import { TextProps, TouchableOpacityProps } from 'react-native';
import React, { PropsWithChildren } from 'react';

import styled from 'styled-components/native';
import { ButtonProps, useTheme } from 'react-native-paper';
const ButtonStyled = styled.TouchableOpacity<{
  isLandscape: boolean;
  bgColor: string;
}>`
  background-color: ${(props) => props.bgColor};
  border-radius: 12px;
  height: 48px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  ${(props) => props.isLandscape && 'min-width: 200px;'}
`;

const AppButton = (
  props: TouchableOpacityProps &
    PropsWithChildren & { isLandscape?: boolean; bgColor?: string }
) => {
  const theme = useTheme();
  return (
    <ButtonStyled
      {...props}
      bgColor={props.bgColor ?? theme.colors.primary}
      isLandscape={props.isLandscape ?? false}
    >
      {props.children}
    </ButtonStyled>
  );
};
export default AppButton;
