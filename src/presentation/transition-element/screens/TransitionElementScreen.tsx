import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  LayoutRectangle,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TransitionElementScreenStyles from '../styles/TransitionElementScreenStyles';
import GRID_IMAGES from '../assets/images/images';
import {ELEMENT_TEXT} from '../constants';
import AnimatedComponent = Animated.AnimatedComponent;
import {useHeaderHeight} from '@react-navigation/elements';

interface Props {}
const TransitionElementScreen: React.FC<Props> = () => {
  // Local state
  const [activeImage, setActiveImage] = useState<
    ImageSourcePropType | undefined
  >(undefined);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectingElement, setSelectingElement] = useState<boolean>(false);

  // Hooks
  const headerHeight = useHeaderHeight();
  const {height: screenHeight} = Dimensions.get('window');

  // Animated Values
  const animation = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.ValueXY()).current;

  // References
  const elementsRef = useRef<any>([]);
  const viewImageRef = useRef<View | null>(null);
  const isFirstRender = useRef<boolean>(true);
  const dismissX = useRef<number>(0);
  const dismissWidth = useRef<number>(0);
  const dismissHeight = useRef<number>(0);
  const dismissY = useRef<number>(0);

  // Effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (selectingElement) {
      viewImageRef.current?.measure(
        (tX, tY, tWidth, tHeight, tPageX, tPageY) => {
          Animated.parallel([
            Animated.spring(position.x, {
              toValue: tPageX,
              useNativeDriver: false,
            }),
            Animated.spring(position.y, {
              toValue: tPageY - headerHeight,
              useNativeDriver: false,
            }),
            Animated.spring(size.x, {
              toValue: tWidth,
              useNativeDriver: false,
            }),
            Animated.spring(size.y, {
              toValue: tHeight,
              useNativeDriver: false,
            }),
            Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        },
      );
      setSelectingElement(false);
    }
  }, [
    activeImage,
    activeIndex,
    animation,
    position.x,
    position.y,
    size.x,
    size.y,
    selectingElement,
    headerHeight,
  ]);

  // Handlers
  const handleOnLayout = (nativeEvent: {
    layout: LayoutRectangle;
    target?: number | null | undefined;
  }) => {
    console.log('nativeEvent', nativeEvent);
  };

  const handleSelectElement = (index: number) => {
    elementsRef.current[index].measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        dismissX.current = pageX;
        dismissY.current = pageY;
        dismissWidth.current = width;
        dismissHeight.current = height;
        position.setValue({
          x: pageX,
          y: pageY,
        });

        size.setValue({
          x: width,
          y: height,
        });
        setSelectingElement(true);
        setActiveImage(GRID_IMAGES[index]);
        setActiveIndex(index);
      },
    );
  };
  const handleDismissElement = () => {
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: dismissX.current,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(position.y, {
        toValue: dismissY.current,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.x, {
        toValue: dismissWidth.current,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(size.y, {
        toValue: dismissHeight.current,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setActiveImage(undefined);
    });
  };

  // Animated Styles
  const animatedContentTranslate = useMemo(() => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: [screenHeight - 250 - headerHeight, 0],
    });
  }, [animation, headerHeight, screenHeight]);

  const animatedContentStyles = useMemo(() => {
    return {
      opacity: animation,
      transform: [
        {
          translateY: animatedContentTranslate,
        },
      ],
    };
  }, [animatedContentTranslate, animation]);

  const animatedClose = {
    opacity: animation,
  };

  const activeImageStyle = {
    width: size.x,
    height: size.y,
    top: position.y,
    left: position.x,
  };

  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1,
  };

  return (
    <View style={TransitionElementScreenStyles.container}>
      <ScrollView style={TransitionElementScreenStyles.container}>
        <View style={TransitionElementScreenStyles.grid}>
          {GRID_IMAGES.map((src, index) => {
            const style = index === activeIndex ? activeIndexStyle : undefined;

            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleSelectElement(index)}>
                <Animated.Image
                  source={src}
                  style={[TransitionElementScreenStyles.gridImage, style]}
                  resizeMode="cover"
                  onLayout={({nativeEvent}) => handleOnLayout(nativeEvent)}
                  ref={(element: AnimatedComponent<any>) =>
                    (elementsRef.current[index] = element)
                  }
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={activeImage ? 'auto' : 'none'}>
        <View
          style={TransitionElementScreenStyles.topContent}
          ref={viewImageRef}>
          <Animated.Image
            key={activeImage?.toString()}
            source={activeImage ? activeImage : undefined}
            resizeMode="cover"
            style={[TransitionElementScreenStyles.viewImage, activeImageStyle]}
          />
        </View>
        <Animated.View
          style={[
            TransitionElementScreenStyles.content,
            animatedContentStyles,
            {height: screenHeight - 250 - headerHeight},
          ]}>
          <Text style={TransitionElementScreenStyles.title}>
            Pretty Image from Unsplash
          </Text>
          <Text style={TransitionElementScreenStyles.textBody}>
            {ELEMENT_TEXT}
          </Text>
        </Animated.View>
        <TouchableWithoutFeedback onPress={handleDismissElement}>
          <Animated.View
            style={[TransitionElementScreenStyles.close, animatedClose]}>
            <Text style={TransitionElementScreenStyles.closeText}>X</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default TransitionElementScreen;
