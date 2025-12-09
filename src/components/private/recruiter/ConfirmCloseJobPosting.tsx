import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import utilityStyles from 'src/styles/utilityStyles';

interface ConfirmCloseJobPostingProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}
const ConfirmCloseJobPosting = ({
  handleCancel,
  handleConfirm,
}: ConfirmCloseJobPostingProps) => {
  return (
    <View
      style={{
        ...styles.content,
        borderRadius: utilityStyles.btnBorderRadius.borderRadius,
      }}
    >
      <Text variant='titleMedium' style={styles.title}>
        Confirmar Cierre de Oferta
      </Text>

      <Text variant='bodyMedium' style={styles.subtitle}>
        ¿Estás seguro de que quieres cerrar esta oferta?
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          style={styles.confirmButton}
          buttonColor='#D32F2F'
          textColor='#FFFFFF'
          onPress={handleConfirm}
        >
          Confirmar
        </Button>

        <Button
          onPress={handleCancel}
          mode='text'
          style={styles.cancelButton}
          textColor='#666666'
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 24,
    backgroundColor: 'white',
    width: '90%',
    marginHorizontal: 'auto',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  confirmButton: {
    borderRadius: 8,
    paddingVertical: 4,
  },
  cancelButton: {
    borderRadius: 8,
  },
});

export default ConfirmCloseJobPosting;
