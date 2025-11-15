import { View, Text, ImageProps } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
const CardImageStyled = styled.Image`
  width: 100%;
  height: 100%;
`;
const CardImage = (props: ImageProps) => {
  return <CardImageStyled {...props} />;
};

export default CardImage;
