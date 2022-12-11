import React, {useRef} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ProgressBarScreenStyles, {
  BUTTON_WIDTH,
} from '../styles/ProgressBarScreenStyles';

interface Props {}
const ProgressBarScreen: React.FC<Props> = () => {
  // Animated Values
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  // Handlers
  const onGetItPress = () => {
    opacity.setValue(1);
    progress.setValue(0);
    progressAnimation.start(({finished}) => {
      if (finished) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  // Animations
  const progressAnimation = Animated.timing(progress, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: false,
  });

  // Animated Styles
  const colorInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(207,22,121)', 'rgb(68,17,171)'],
  });

  const buttonStyles = {
    width: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, BUTTON_WIDTH],
      extrapolate: 'clamp',
    }),
    opacity,
    backgroundColor: colorInterpolate,
  };
  return (
    <View style={ProgressBarScreenStyles.container}>
      <TouchableWithoutFeedback onPress={onGetItPress}>
        <View style={ProgressBarScreenStyles.button}>
          <Animated.View
            style={[ProgressBarScreenStyles.buttonProgress, buttonStyles]}
          />
          <Text style={ProgressBarScreenStyles.text}>Get it!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProgressBarScreen;
