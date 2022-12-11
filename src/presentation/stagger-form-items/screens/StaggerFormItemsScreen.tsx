import React, {useEffect, useRef} from 'react';
import {
  Animated,
  TextInput,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import useCreateAnimationStyle from '../hooks/useCreateAnimationStyle';
import images from '../../../assets/images';
import StaggerFormItemScreenStyles from '../styles/StaggerFormItemScreenStyles';
import AnimatedInput from '../components/AnimatedInput';
import useReloadScreen from '../../shared/hooks/useReloadScreen';

interface Props {}
const StaggerFormItemsScreen: React.FC<Props> = () => {
  // Animated Values
  const email = useRef(new Animated.Value(0)).current;
  const password = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;
  const emailRef = useRef<TextInput | null>(null);

  // Hooks
  const emailStyle = useCreateAnimationStyle(email);
  const passwordStyle = useCreateAnimationStyle(password);
  const buttonStyle = useCreateAnimationStyle(button);
  const reload = useReloadScreen('StaggerFormItems');

  // Effects
  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(email, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(password, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(button, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      emailRef.current?.focus();
    });
  }, [button, email, password]);

  return (
    <ImageBackground
      source={images.backgroundLogIn}
      style={StaggerFormItemScreenStyles.container}>
      <KeyboardAvoidingView style={StaggerFormItemScreenStyles.form}>
        <View style={StaggerFormItemScreenStyles.container}>
          <Text style={StaggerFormItemScreenStyles.title}>Login</Text>
          <AnimatedInput
            ref={emailRef}
            style={[StaggerFormItemScreenStyles.input, emailStyle]}
            placeholder="Email"
            keyboardType="email-address"
          />
          <AnimatedInput
            placeholder="Password"
            style={[StaggerFormItemScreenStyles.input, passwordStyle]}
            secureTextEntry
          />
          <TouchableOpacity>
            <Animated.View
              style={[StaggerFormItemScreenStyles.button, buttonStyle]}>
              <Text style={StaggerFormItemScreenStyles.buttonText}>LOGIN</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={reload}
            style={[StaggerFormItemScreenStyles.button]}>
            <Text style={StaggerFormItemScreenStyles.buttonText}>RELOAD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default StaggerFormItemsScreen;
