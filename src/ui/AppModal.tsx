import React, { PropsWithChildren } from 'react';
import { Modal, ModalProps } from 'react-native-paper';

interface AppModalProps extends ModalProps {
  elementVisible: boolean;
}

const AppModal = (props: AppModalProps) => {
  const { elementVisible, children, ...restOfprops } = props;
  return <Modal {...restOfprops}>{children}</Modal>;
};
export default AppModal;
