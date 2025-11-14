import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PUBLIC_NAVIGATOR_ROUTES from 'src/navigators/publicNavigator/PUBLIC_NAVIGATOR_ROUTES';
import { publicNavigatorRootStack } from 'src/navigators/publicNavigator/PublicNavigator';
import AppButton from 'src/ui/Button';
import styled from 'styled-components/native';
import AppHeader from '../ui/AppHeader';

const Container = styled.View`
  flex: 1;
  background-color: #f7fafc;
`;

const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const LogoText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  letter-spacing: -0.5px;
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

const Card = styled.View<{
  rotation: number;
  left?: number;
  right?: number;
  isLandscape: boolean;
  screenWidth: number;
}>`
  position: absolute;
  width: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.25 : props.screenWidth * 0.5}px;
  height: ${(props) =>
    props.isLandscape ? props.screenWidth * 0.33 : props.screenWidth * 0.67}px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
  transform: rotate(${(props) => props.rotation}deg);
  ${(props) => props.left !== undefined && `left: ${props.left}px;`}
  ${(props) => props.right !== undefined && `right: ${props.right}px;`}
  top: ${(props) => (props.isLandscape ? '16px' : '32px')};
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

const Footer = styled.View<{ isLandscape: boolean }>`
  padding-horizontal: 16px;
  padding-bottom: ${(props) => (props.isLandscape ? '16px' : '32px')};
  padding-top: 16px;
  gap: 8px;
  ${(props) =>
    props.isLandscape &&
    'flex-direction: row; justify-content: center; align-items: center;'}
`;

const ButtonContainer = styled.View<{ isLandscape: boolean }>`
  width: ${(props) => (props.isLandscape ? 'auto' : '100%')};
  max-width: 448px;
  align-self: center;
  ${(props) => props.isLandscape && 'margin-right: 16px;'}
`;

const GetStartedButton = styled.TouchableOpacity<{ isLandscape: boolean }>`
  background-color: #38b2ac;
  border-radius: 12px;
  height: 48px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  ${(props) => props.isLandscape && 'min-width: 200px;'}
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

const FooterText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  text-align: center;
  padding-horizontal: 16px;
`;

const LinkText = styled.Text`
  font-weight: 700;
  color: #38b2ac;
  text-decoration-line: underline;
`;

const TextWrapper = styled.View<{ isLandscape: boolean }>`
  ${(props) =>
    props.isLandscape && 'flex: 1; max-width: 100%; padding-left: 32px;'}
`;

const LogoIcon = styled.Text`
  font-size: 28px;
  color: #2d3748;
`;

const WelcomeComponent = ({
  isLandscape,
  width,
}: {
  isLandscape: boolean;
  width: number;
}) => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<publicNavigatorRootStack>>();
  return (
    <Container>
      <AppHeader></AppHeader>

      <MainContent isLandscape={isLandscape}>
        <ContentWrapper isLandscape={isLandscape}>
          <CardContainer isLandscape={isLandscape} screenWidth={width}>
            <Card
              rotation={-12}
              left={0}
              isLandscape={isLandscape}
              screenWidth={width}
            >
              <CardImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJoszwyNyJpJQB08xFpe59uUkizWMCFsD2T_hqkMYcl0chToThcW2zTTKoicbQkexbxASu75AZ2h9srg8xX0JGdvqIBCVn9a4MV4Rx3kw3GYiZbCM3_SseypV0nssOUg4Hi0QtcjNax7CO66hNaAJQGRUy1I2mm_GBMY4vos6q0t-5Zu_dtEJmvg6y2IigZpZyw6Bbv0AkFC60ACpYuq4RHgW35jYR_thyt4Ey1CJWtQcgvIl9j8zdsA0WzapZhJz1JZUjUnOXS1_h',
                }}
                resizeMode='cover'
              />
            </Card>
            <Card
              rotation={12}
              right={0}
              isLandscape={isLandscape}
              screenWidth={width}
            >
              <CardImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdPX6sRLxBUkP1yEEwAl7BhHUWlp0S2DPUZGb15KvMGbPm-M6PBUSovA9CJINzQ6y2mL9kXlvMTHsYuiM5M_m0K-sdDPSHFlsT7sdM-P0KukiTjRUYLAuvVKomOLhtVEMVZS12xavX_0FlLtIAU3H5ju7xW9yB8GKexzJQWQbPFBrjPkj7w4cXduzPsDJ3rXK4DQrrYhnDP7Qxbyt08eR3giWmnyrN6ENu10_li6wacSKTF6yFME8ep75NZ2NWN6NXG0YNirqsTdzl',
                }}
                resizeMode='cover'
              />
            </Card>
          </CardContainer>
        </ContentWrapper>

        <TextWrapper isLandscape={isLandscape}>
          <Title isLandscape={isLandscape}>
            Código y Oportunidades se Conectan.
          </Title>
          <Subtitle isLandscape={isLandscape}>
            Desliza a la derecha por tu próximo paso profesional. Conecta con
            los mejores reclutadores y desarrolladores fácilmente.
          </Subtitle>
        </TextWrapper>
      </MainContent>

      <Footer isLandscape={isLandscape}>
        <ButtonContainer isLandscape={isLandscape}>
          <GetStartedButton activeOpacity={0.9} isLandscape={isLandscape}>
            <ButtonText
              onPress={() =>
                navigation.navigate(PUBLIC_NAVIGATOR_ROUTES.SIGN_UP, {})
              }
            >
              Comenzar
            </ButtonText>
          </GetStartedButton>
        </ButtonContainer>
        <View>
          <FooterText>
            ¿Ya tienes una cuenta?{' '}
            <LinkText
              onPress={() =>
                navigation.navigate(PUBLIC_NAVIGATOR_ROUTES.LOGIN, {})
              }
            >
              Iniciar Sesión
            </LinkText>
          </FooterText>
        </View>

        <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TouchableWithoutFeedback
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Text
              variant='labelMedium'
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                borderBottomColor: theme.colors.primary,
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
                display: 'flex',
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}
            >
              ¿Olvidaste tu contraseña ?
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Footer>
    </Container>
  );
};

export default WelcomeComponent;
