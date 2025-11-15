import { PropsWithChildren } from 'react';
import { TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components/native';

const ButtonTextStyled = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 700;
`;
export const AppButtonText = (
  props: TextProps & PropsWithChildren & { color?: string }
) => {
  const theme = useTheme();
  return (
    <ButtonTextStyled color={props?.color ?? theme.colors.onPrimary} {...props}>
      {props.children}
    </ButtonTextStyled>
  );
};

export default AppButtonText;
