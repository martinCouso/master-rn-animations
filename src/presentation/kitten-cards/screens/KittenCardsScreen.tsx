import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {CATS, SWIPE_THRESHOLD} from '../constants';
import KittenCardsScreenStyles, {
  CARD_WIDTH,
} from '../styles/KittenCardsScreenStyles';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
const KittenCardsScreen: React.FC<Props> = ({navigation}) => {
  // Local State
  const [cats, setCats] = useState<typeof CATS>(CATS);
  const [disableButtons, setDisableButtons] = useState(false);
  const prevLength = useRef(CATS.length);
  // References
  const isFirstRender = useRef(true);

  // Animated Values
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const next = useRef(new Animated.Value(0.8)).current;

  const refreshAnimatedValues = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'KittenCards',
        },
      ],
    });
  };

  // Effects
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (cats.length < prevLength.current) {
      next.setValue(0.8);
      opacity.setValue(1);
      prevLength.current = cats.length;
      pan.setValue({x: 0, y: 0});
      setDisableButtons(false);
    }
  }, [cats, next, opacity, pan]);

  // Gesture Handler
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-expect-error
          x: pan.x._value,
          // @ts-expect-error
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, {dx, vx, vy}) => {
        let velocity = 0;

        if (vx > 0) {
          velocity = 15;
        } else if (vx < 0) {
          velocity = 15 * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98,
            useNativeDriver: false,
          }).start(transitionNex);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  // Handlers
  const handleNo = () => {
    setDisableButtons(true);
    Animated.timing(pan.x, {
      toValue: -CARD_WIDTH * 3,
      useNativeDriver: false,
    }).start(transitionNex);
  };
  const handleYes = () => {
    setDisableButtons(true);
    Animated.timing(pan.x, {
      toValue: CARD_WIDTH * 3,
      useNativeDriver: false,
    }).start(transitionNex);
  };

  // Animations
  const transitionNex = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(next, {toValue: 1, friction: 4, useNativeDriver: false}),
    ]).start(() => {
      setCats(prevState => [...prevState.slice(1)]);
    });
  };

  // Animated Styles
  const animatedRotation = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });
  const animatedOpacity = pan.x.interpolate({
    inputRange: [
      -SWIPE_THRESHOLD,
      -SWIPE_THRESHOLD + 1,
      0,
      SWIPE_THRESHOLD - 1,
      SWIPE_THRESHOLD,
    ],
    outputRange: [0.5, 1, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const noOpacity = pan.x.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 0],
  });
  const yesOpacity = pan.x.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
  });
  const noScale = pan.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const yesScale = pan.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const animatedImageStyles = {
    opacity: animatedOpacity,
  };
  const animatedCardStyles = {
    transform: [{rotate: animatedRotation}, ...pan.getTranslateTransform()],
    opacity: animatedOpacity,
  };
  const animatedNopeStyles = {
    transform: [{scale: noScale}, {rotate: '30deg'}],
    opacity: noOpacity,
  };
  const animatedYupStyles = {
    transform: [{scale: yesScale}, {rotate: '-30deg'}],
    opacity: yesOpacity,
  };

  return (
    <View style={KittenCardsScreenStyles.container}>
      <View style={KittenCardsScreenStyles.top}>
        {cats
          .slice(0, 2)
          .reverse()
          .map(({image, id, text}, index, items) => {
            const isLastItem = index === items.length - 1;
            const isSecondToLast = index === items.length - 2;

            const panHandlers = isLastItem ? panResponder.panHandlers : {};
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const imageStyle = isLastItem ? animatedImageStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: next}]}
              : undefined;

            return (
              <Animated.View
                {...panHandlers}
                style={[KittenCardsScreenStyles.card, cardStyle, nextStyle]}
                key={id}>
                <Animated.Image
                  source={image}
                  style={[KittenCardsScreenStyles.image, imageStyle]}
                  resizeMode="cover"
                />
                <View style={KittenCardsScreenStyles.lowerText}>
                  <Text>{text}</Text>
                </View>

                {isLastItem && (
                  <Animated.View
                    style={[KittenCardsScreenStyles.nope, animatedNopeStyles]}>
                    <Text style={KittenCardsScreenStyles.nopeText}>Nope!</Text>
                  </Animated.View>
                )}

                {isLastItem && (
                  <Animated.View
                    style={[KittenCardsScreenStyles.yup, animatedYupStyles]}>
                    <Text style={KittenCardsScreenStyles.yupText}>Yup!</Text>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
      </View>
      <View style={KittenCardsScreenStyles.bottom}>
        <TouchableOpacity
          onPress={handleNo}
          disabled={disableButtons}
          style={[
            KittenCardsScreenStyles.button,
            KittenCardsScreenStyles.nopeButton,
          ]}>
          <Text style={KittenCardsScreenStyles.nopeText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            refreshAnimatedValues();
          }}
          style={[KittenCardsScreenStyles.button]}>
          <Text style={KittenCardsScreenStyles.nopeText}>REFRESH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleYes}
          disabled={disableButtons}
          style={[
            KittenCardsScreenStyles.button,
            KittenCardsScreenStyles.yupButton,
          ]}>
          <Text style={KittenCardsScreenStyles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default KittenCardsScreen;
