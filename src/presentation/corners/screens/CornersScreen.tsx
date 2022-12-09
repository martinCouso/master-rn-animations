import React from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import CornersScreenStyles from '../styles/CornersScreenStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface Props {}
const CornerScreen: React.FC<Props> = () => {
  // Animated Values
  const animation = React.useRef(new Animated.ValueXY({x: 0, y: 0}));
  let _width = 0;
  let _height = 0;

  // hooks
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  // Handlers
  const startAnimation = () => {
    // First we get the screen dimensions.
    const width = Dimensions.get('window').width;
    /**
     * And me we make sure that the header and area for Home swipe
     * gesture are taken in consideration.
     */
    const height =
      Dimensions.get('window').height - headerHeight - insets.bottom;
    const useNativeDriver = true;
    /** Then we create a sequence to run 4 spring animations
     * to move the box through the 4 corners of the screen
     */
    Animated.sequence([
      Animated.spring(animation.current.y, {
        toValue: height - _height,
        useNativeDriver,
      }),
      Animated.spring(animation.current.x, {
        toValue: width - _width,
        useNativeDriver,
      }),
      Animated.spring(animation.current.y, {
        toValue: 0,
        useNativeDriver,
      }),
      Animated.spring(animation.current.x, {
        toValue: 0,
        useNativeDriver,
      }),
    ]).start();
  };

  const captureDimensions = (e: LayoutChangeEvent) => {
    _width = e.nativeEvent.layout.width;
    _height = e.nativeEvent.layout.height;
  };

  // Animated Styles
  const animatedStyles = {
    transform: animation.current.getTranslateTransform(),
  };

  return (
    <View>
      <TouchableWithoutFeedback
        onLayout={captureDimensions}
        onPress={startAnimation}>
        <Animated.View style={[CornersScreenStyles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CornerScreen;
