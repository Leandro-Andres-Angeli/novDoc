/* import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

const LoginScreen = () => {
  const testCollection = collection(db, 'test');
  const q = query(testCollection);
  const [users, setUsers] = useState<any[]>([]);
  //   console.log('query', q);
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers([]);
      console.log('here');
      if (querySnapshot.empty) {
        console.log('nothing here');
      }

      return querySnapshot.forEach((doc) =>
        setUsers((prev) => [...prev, doc.data()])
      );
    });
    return () => {
      setUsers([]);
      return unsubscribe();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text>LoginScreen</Text>
      <Text>{JSON.stringify(users, null, 3)}</Text>
    </View>
  );
};

export default LoginScreen; */

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { AuthContext } from '../appContext/AuthContext';

const { width } = Dimensions.get('window');

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

const MainContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 32px;
`;

const ContentWrapper = styled.View`
  width: 100%;
  max-width: 384px;
  align-items: center;
`;

const CardContainer = styled.View`
  position: relative;
  width: ${width * 0.7}px;
  height: ${width * 0.7}px;
  margin-bottom: 32px;
`;

const Card = styled.View<{ rotation: number; left?: number; right?: number }>`
  position: absolute;
  width: ${width * 0.5}px;
  height: ${width * 0.67}px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
  transform: rotate(${(props: IntoScreenProps) => props.rotation}deg);
  ${(props: IntoScreenProps) =>
    props.left !== undefined && `left: ${props.left}px;`}
  ${(props: IntoScreenProps) =>
    props.right !== undefined && `right: ${props.right}px;`}
  top: 32px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: #0a2540;
  text-align: center;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
  margin-top: 24px;
  line-height: 40px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #2d3748;
  text-align: center;
  line-height: 24px;
  padding-horizontal: 16px;
`;

const Footer = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 32px;
  padding-top: 16px;
  gap: 8px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  max-width: 448px;
  align-self: center;
`;

const GetStartedButton = styled.TouchableOpacity`
  background-color: #38b2ac;
  border-radius: 12px;
  height: 48px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
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

const LogoIcon = styled.Text`
  font-size: 28px;
  color: #2d3748;
`;
interface IntoScreenProps {
  rotation: number;
  left?: number;
  right?: number;
}

const IntroScreen = () => {
  const { login, authState, logout } = useContext(AuthContext);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoIcon>{'</>'}</LogoIcon>
          <LogoText>DevMatch</LogoText>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentWrapper>
          <CardContainer>
            <Card rotation={-12} left={0}>
              <CardImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJoszwyNyJpJQB08xFpe59uUkizWMCFsD2T_hqkMYcl0chToThcW2zTTKoicbQkexbxASu75AZ2h9srg8xX0JGdvqIBCVn9a4MV4Rx3kw3GYiZbCM3_SseypV0nssOUg4Hi0QtcjNax7CO66hNaAJQGRUy1I2mm_GBMY4vos6q0t-5Zu_dtEJmvg6y2IigZpZyw6Bbv0AkFC60ACpYuq4RHgW35jYR_thyt4Ey1CJWtQcgvIl9j8zdsA0WzapZhJz1JZUjUnOXS1_h',
                }}
                resizeMode='cover'
              />
            </Card>
            <Card rotation={12} right={0}>
              <CardImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdPX6sRLxBUkP1yEEwAl7BhHUWlp0S2DPUZGb15KvMGbPm-M6PBUSovA9CJINzQ6y2mL9kXlvMTHsYuiM5M_m0K-sdDPSHFlsT7sdM-P0KukiTjRUYLAuvVKomOLhtVEMVZS12xavX_0FlLtIAU3H5ju7xW9yB8GKexzJQWQbPFBrjPkj7w4cXduzPsDJ3rXK4DQrrYhnDP7Qxbyt08eR3giWmnyrN6ENu10_li6wacSKTF6yFME8ep75NZ2NWN6NXG0YNirqsTdzl',
                }}
                resizeMode='cover'
              />
            </Card>
          </CardContainer>

          <Title> Código y Oportunidades se Conectan.</Title>
          <Subtitle>
            Desliza a la derecha por tu próximo paso profesional. Conecta con
            los mejores reclutadores y desarrolladores fácilmente.
          </Subtitle>
        </ContentWrapper>
      </MainContent>

      <Footer>
        <ButtonContainer>
          <GetStartedButton activeOpacity={0.9}>
            <ButtonText>Comenzar</ButtonText>
          </GetStartedButton>
        </ButtonContainer>
        <ButtonContainer>
          <GetStartedButton
            onPress={() => login({ data: Math.random() })}
            activeOpacity={0.9}
          >
            <ButtonText>Login</ButtonText>
          </GetStartedButton>
        </ButtonContainer>
        <ButtonContainer>
          <GetStartedButton onPress={() => logout()} activeOpacity={0.9}>
            <ButtonText>Logout</ButtonText>
          </GetStartedButton>
        </ButtonContainer>
        <Text>{JSON.stringify(authState)}</Text>
        <FooterText>
          ¿Ya tienes una cuenta?<LinkText>Iniciar Sesión</LinkText>
        </FooterText>
      </Footer>
    </Container>
  );
};

export default IntroScreen;
