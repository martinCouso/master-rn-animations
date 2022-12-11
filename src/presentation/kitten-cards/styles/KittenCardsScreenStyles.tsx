import {StyleSheet} from 'react-native';

export const CARD_WIDTH = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  yupButton: {
    shadowColor: 'green',
  },
  nopeButton: {
    shadowColor: 'red',
  },

  card: {
    width: CARD_WIDTH,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  lowerText: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 5,
  },
  image: {
    borderRadius: 2,
    flex: 3,
    width: 'auto',
    height: 'auto',
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: '#FFF',
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: '#FFF',
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
});

export default styles;
