import {StyleSheet} from 'react-native';
import {SECONDARY_FONT} from '../../shared/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E22D4B',
    flexDirection: 'row',
  },
  progress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
  },
  bar: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    position: 'absolute',
  },
  close: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: 'transparent',
  },
  closeText: {
    fontSize: 30,
    color: '#FFF',
  },
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  yes: {
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  optionText: {
    fontSize: 30,
    color: '#FFF',
    marginBottom: 50,
  },
  congratsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  congratsText: {
    fontSize: 50,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: SECONDARY_FONT,
  },
});

export default styles;
