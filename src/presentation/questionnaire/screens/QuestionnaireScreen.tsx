import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QuestionnaireScreenStyles from '../styles/QuestionnaireScreenStyles';
import {QUESTIONS} from '../constants';

interface Props {}
const QuestionnaireScreen: React.FC<Props> = () => {
  // Local State
  const [index, setIndex] = useState(0);

  // Animated Values
  const animation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  // References
  const isFirstRender = useRef(true);

  // Effects
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    animation.setValue(0);
  }, [animation, index]);

  // Calculated Values
  const {width} = Dimensions.get('window');
  const question = useMemo(() => QUESTIONS[index], [index]);
  let nextQuestion = useMemo(() => {
    if (index + 1 < QUESTIONS.length) {
      return QUESTIONS[index + 1];
    }
    return null;
  }, [index]);

  // Animated Styles
  /**
   * Everytime that the user clicks in on the of the
   * optionButtons we move the next question into the screen from the left
   */
  const nextQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  /**
   * Everytime that the user clicks in on the of the
   * optionButtons we move the current question out the screen to the left.
   */
  const mainQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const progressInterpolate = progress.interpolate({
    inputRange: [0, QUESTIONS.length],
    outputRange: ['0%', '100%'],
  });

  const progressStyle = {
    width: progressInterpolate,
  };

  const mainQuestionStyle = {
    transform: [
      {
        translateX: mainQuestionInterpolate,
      },
    ],
  };

  const nextQuestionStyle = {
    transform: [
      {
        translateX: nextQuestionInterpolate,
      },
    ],
  };

  // Handlers
  /**
   * Everytime that the user clicks on of the options
   * 2 animations are fired in parallel, the first one to make the progress
   * bar at the bottom of the screen to grow and the second one to trigger the
   * translation of the questions via interpolation.
   */
  const handleAnswer = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIndex(prevIndex => prevIndex + 1);
    });
  };

  return (
    <View style={QuestionnaireScreenStyles.container}>
      {index < QUESTIONS.length ? (
        <>
          <View
            style={[
              StyleSheet.absoluteFill,
              QuestionnaireScreenStyles.overlay,
            ]}>
            <Animated.Text
              style={[
                QuestionnaireScreenStyles.questionText,
                mainQuestionStyle,
              ]}>
              {question}
            </Animated.Text>
            <Animated.Text
              style={[
                QuestionnaireScreenStyles.questionText,
                nextQuestionStyle,
              ]}>
              {nextQuestion}
            </Animated.Text>
          </View>

          <TouchableOpacity
            onPress={handleAnswer}
            style={QuestionnaireScreenStyles.option}
            activeOpacity={0.7}>
            <Text style={QuestionnaireScreenStyles.optionText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAnswer}
            style={[
              QuestionnaireScreenStyles.option,
              QuestionnaireScreenStyles.yes,
            ]}
            activeOpacity={0.7}>
            <Text style={QuestionnaireScreenStyles.optionText}>Yes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={QuestionnaireScreenStyles.congratsContainer}>
          <Text style={QuestionnaireScreenStyles.congratsText}>Thank you!</Text>
        </View>
      )}
      <View style={QuestionnaireScreenStyles.progress}>
        <Animated.View style={[QuestionnaireScreenStyles.bar, progressStyle]} />
      </View>
    </View>
  );
};

export default QuestionnaireScreen;
