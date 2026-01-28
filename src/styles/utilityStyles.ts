import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const utilityStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },

  inputsContainer: {
    gap: 16,
  },
  input: {
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3f3f46',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  fab: {
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabContent: {
    height: 48,
  },
  fabLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  btnBorderRadius: {
    borderRadius: 12,
  },
  muteButtonBgColor: {
    backgroundColor: '#E5E5E5',
  },
  muteButtonColor: {
    color: '#333',
  },
  muteButton: {
    color: '#333',
    backgroundColor: '#E5E5E5',
  },
  btn: {
    paddingVertical: 8,
  },
  descriptionText: {
    textAlign: 'center',
    color: '#666666',
    // color: '#666666',
    marginBottom: 24,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  mainTitle: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 28,
  },
});

export default utilityStyles;
