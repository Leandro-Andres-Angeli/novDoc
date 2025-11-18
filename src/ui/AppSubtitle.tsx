import { StyleSheet, TextProps, TextStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
const Subtitle = styled.Text<{
  isLandscape: boolean;
  textAlign?: TextStyle['textAlign'];
}>`
  font-size: ${(props) => (props.isLandscape ? '14px' : '16px')};
  font-weight: 400;
  color: #2d3748;
  text-align: ${(props) => props.textAlign ?? 'center'};
  line-height: ${(props) => (props.isLandscape ? '20px' : '24px')};
  padding-horizontal: 16px;
`;
const AppSubtitle = (
  props: TextProps &
    PropsWithChildren & {
      isLandscape?: boolean;
      textAlign?: TextStyle['textAlign'];
    }
) => {
  return (
    <Subtitle {...props} isLandscape={props.isLandscape ?? false}>
      {props.children}
    </Subtitle>
  );
};
const base = StyleSheet.create({
  styles: {
    textAlign: 'center',
  },
});

export default AppSubtitle;
