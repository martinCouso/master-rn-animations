import React from 'react';
import {
  Animated,
  GestureResponderHandlers,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import ProfileHeadStyles from '../styles/ProfileHeadStyles';

interface Props {
  image: ImageSourcePropType;
  animatedStyles: Animated.WithAnimatedValue<ImageStyle>;
  pan: GestureResponderHandlers | undefined;
}
const ProfileHead: React.FC<Props> = ({animatedStyles, image, pan}) => {
  return (
    <Animated.Image
      {...pan}
      source={image}
      style={[ProfileHeadStyles.container, animatedStyles]}
    />
  );
};

export default ProfileHead;
