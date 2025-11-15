import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';
const LinkTextStyled = styled.Text<{ color: string }>`
  font-weight: 700;
  color: ${(props) => props.color};
  text-decoration-line: underline;
`;
const LinkText = (props: TextProps & { color?: string | undefined }) => {
  const theme = useTheme();

  return (
    <LinkTextStyled {...props} color={props?.color ?? theme.colors.primary}>
      Iniciar Sesión
    </LinkTextStyled>
  );
};

export default LinkText;
