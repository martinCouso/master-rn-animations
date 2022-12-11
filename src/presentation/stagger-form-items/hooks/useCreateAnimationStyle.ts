import {Animated} from 'react-native';

const useCreateAnimationStyle = (animatedValue: Animated.Value) => {
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animatedValue,
    transform: [
      {
        translateY,
      },
    ],
  };
};

export default useCreateAnimationStyle;
