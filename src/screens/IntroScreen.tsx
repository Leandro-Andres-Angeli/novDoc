/* import { View, Text, ViewStyle } from 'react-native';
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

import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlexStyle, AppState } from 'react-native';
import styled from 'styled-components/native';
import { AuthContext } from '../appContext/AuthContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

import WelcomeComponent from '../components/Welcome';

const { width } = Dimensions.get('window');
interface FlexContainerProps {
  flexDirection: FlexStyle['flexDirection'];
}
interface IntoScreenViewProps {
  rotation: number;
  left?: number;
  right?: number;
}
const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const FlexContainer = styled.View<FlexContainerProps>`
  flex: 1;
  flex-direction: ${(props) => props?.flexDirection};
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
  transform: rotate(${(props: IntoScreenViewProps) => props.rotation}deg);
  ${(props: IntoScreenViewProps) =>
    props.left !== undefined && `left: ${props.left}px;`}
  ${(props: IntoScreenViewProps) =>
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

// interface IntoScreenProps
//   extends NativeStackScreenProps<
//     publicNavigatorRootStack,
//     PUBLIC_NAVIGATOR_ROUTES.INTRO
//   > {}
//   { navigation }: IntoScreenProps
const IntroScreen = () => {
  const { login, authState, logout } = useContext(AuthContext);
  const coll = collection(db, 'test');
  const q = query(coll);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('is empty');
      }
      querySnapshot.forEach((doc) => {
        console.log('doc', doc.data());
      });
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  let { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const handleScreenOrientation = (
    screenWidth: number,
    screenHeight: number
  ) => {
    return screenWidth < screenHeight ? 'portrait' : 'landscape';
  };

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    handleScreenOrientation(screenWidth, screenHeight)
  );

  useEffect(() => {
    const DimensionsChangeSubs = Dimensions.addEventListener(
      'change',
      function () {
        screenHeight = Dimensions.get('screen').height;
        screenWidth = Dimensions.get('screen').width;
        setOrientation(handleScreenOrientation(screenWidth, screenHeight));
      }
    );
    const appStateSubs = AppState.addEventListener(
      'change',
      function (appState) {
        if (appState === 'active') {
          screenHeight = Dimensions.get('screen').height;
          screenWidth = Dimensions.get('screen').width;
          setOrientation(handleScreenOrientation(screenWidth, screenHeight));
        }
      }
    );
    return () => {
      DimensionsChangeSubs.remove();
      appStateSubs.remove();
    };
  }, []);

  //PORTRAIT
  return (
    <WelcomeComponent
      isLandscape={orientation === 'landscape'}
      width={screenWidth}
    ></WelcomeComponent>
  );
};
export default IntroScreen;
