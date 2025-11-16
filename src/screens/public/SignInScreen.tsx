import * as React from 'react';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PUBLIC_NAVIGATOR_ROUTES from 'src/navigators/publicNavigator/PUBLIC_NAVIGATOR_ROUTES';
import { publicNavigatorRootStack } from 'src/navigators/publicNavigator/PublicNavigator';

import styled from 'styled-components/native';

import AppButton from '@ui/AppButton';

import AppFooter from '@ui/AppFooter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import SignIn from 'src/components/SignIn';

const Container = styled.View`
  flex: 1;
  background-color: #f7fafc;
`;

const MainContent = styled.View<{ isLandscape: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: ${(props) => (props.isLandscape ? '16px' : '32px')};
  ${(props) => props.isLandscape && 'flex-direction: row;'}
`;

const ContentWrapper = styled.View<{ isLandscape: boolean }>`
  width: 100%;
  max-width: 384px;
  align-items: center;
  ${(props) => props.isLandscape && 'flex: 1; max-width: 50%;'}
`;

const CardContainer = styled.View<{
  isLandscape: boolean;
  screenWidth: number;
}>`
  position: relative;
  width: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.35 : props.screenWidth * 0.7}px;
  height: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.35 : props.screenWidth * 0.7}px;
  margin-bottom: ${(props) => (props.isLandscape ? '16px' : '32px')};
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

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

const Subtitle = styled.Text<{ isLandscape: boolean }>`
  font-size: ${(props) => (props.isLandscape ? '14px' : '16px')};
  font-weight: 400;
  color: #2d3748;
  text-align: center;
  line-height: ${(props) => (props.isLandscape ? '20px' : '24px')};
  padding-horizontal: 16px;
`;

const TextWrapper = styled.View<{ isLandscape: boolean }>`
  ${(props) =>
    props.isLandscape && 'flex: 1; max-width: 100%; padding-left: 32px;'}
`;

const SignInScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<publicNavigatorRootStack>>();
  const { width } = Dimensions.get('screen');
  return (
    <Container>
      <MainContent isLandscape={false}>
        <ContentWrapper isLandscape={false}>
          <CardContainer isLandscape={false} screenWidth={width}>
            <Card>
              <CardImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJoszwyNyJpJQB08xFpe59uUkizWMCFsD2T_hqkMYcl0chToThcW2zTTKoicbQkexbxASu75AZ2h9srg8xX0JGdvqIBCVn9a4MV4Rx3kw3GYiZbCM3_SseypV0nssOUg4Hi0QtcjNax7CO66hNaAJQGRUy1I2mm_GBMY4vos6q0t-5Zu_dtEJmvg6y2IigZpZyw6Bbv0AkFC60ACpYuq4RHgW35jYR_thyt4Ey1CJWtQcgvIl9j8zdsA0WzapZhJz1JZUjUnOXS1_h',
                }}
                resizeMode='cover'
              />
            </Card>
          </CardContainer>
        </ContentWrapper>

        <TextWrapper isLandscape={false}>
          <Title isLandscape={false}>Código y Oportunidades se Conectan.</Title>
          <Subtitle isLandscape={false}>
            Desliza a la derecha por tu próximo paso profesional. Conecta con
            los mejores reclutadores y desarrolladores fácilmente.
          </Subtitle>
        </TextWrapper>
      </MainContent>

      <AppFooter>
        <SignIn></SignIn>
      </AppFooter>
    </Container>
  );
};

export default SignInScreen;
