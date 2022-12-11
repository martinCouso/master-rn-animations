import React, {useMemo, useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import images from '../../../assets/images';
import ProfileHead from '../components/ProfileHead';

interface Props {}
const StaggeredHeadsScreen: React.FC<Props> = () => {
  const leaderPosXY = useRef(new Animated.ValueXY()).current;

  const profileHeads = useMemo(() => {
    return Array.from({length: 4}, (_, index) => ({
      image: images.headProfile,
      pos: index === 0 ? leaderPosXY : new Animated.ValueXY(),
      id: index,
    }));
  }, [leaderPosXY]);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        leaderPosXY.setOffset({
          // @ts-expect-error
          x: leaderPosXY.x._value,
          // @ts-expect-error
          y: leaderPosXY.y._value,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        profileHeads[0].pos.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
        for (let i = 1; i < profileHeads.length; i++) {
          Animated.sequence([
            Animated.delay(i * 100),
            Animated.spring(profileHeads[i].pos, {
              toValue: profileHeads[0].pos,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
      onPanResponderRelease: () => {
        leaderPosXY.flattenOffset();
      },
    }),
  ).current;

  return (
    <View>
      {profileHeads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          const pan =
            index === items.length - 1 ? panResponder.panHandlers : {};
          return (
            <ProfileHead
              key={item.id}
              animatedStyles={{transform: item.pos.getTranslateTransform()}}
              image={item.image}
              pan={pan}
            />
          );
        })}
    </View>
  );
};

export default StaggeredHeadsScreen;
