import { PropsWithChildren } from 'react';
import styled from 'styled-components/native';

const Footer = styled.View<{ isLandscape: boolean }>`
  padding-horizontal: 16px;
  padding-bottom: ${(props) => (props.isLandscape ? '16px' : '32px')};
  padding-top: 16px;
  gap: 8px;
  ${(props) =>
    props.isLandscape &&
    'flex-direction: row; justify-content: center; align-items: center;'}
`;

interface AppFooterProps extends PropsWithChildren {
  isLandscape?: boolean;
}
const AppFooter = (props: AppFooterProps) => {
  return (
    <Footer isLandscape={props.isLandscape ?? false}>{props.children}</Footer>
  );
};
export default AppFooter;
