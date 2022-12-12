import {StyleSheet} from 'react-native';
import {SECONDARY_FONT} from '../../shared/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: '33%',
    height: 150,
  },
  viewImage: {
    width: undefined,
    height: undefined,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topContent: {
    height: 250,
  },
  content: {
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: SECONDARY_FONT,
    marginBottom: 15,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: '#FFF',
  },
  textBody: {
    fontFamily: SECONDARY_FONT,
    textAlign: 'justify',
    fontSize: 18,
  },
});

export default styles;
