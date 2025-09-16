import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// @ts-ignore
import XIcon from '../assets/xIcon.svg';

// To-do: this need moving to the correct file
const colors = {
  primary: 'rgba(120, 113, 255, 1)',
  primaryBlur: 'rgba(125, 119, 255, 0.2)',
  error: 'rgba(180, 75, 75, 1)',
  errorBlur: 'rgba(180, 75, 75, 0.1)',
  transparent: 'transparent',
  bg: '#141534',
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomInput = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState('');
  const emailErrorRef = useRef(false);

  const bgColor = useSharedValue(colors.transparent);
  const inputBgColor = useSharedValue(colors.bg);
  const inputBorderColor = useSharedValue(colors.transparent);
  const inputFontColor = useSharedValue('white');
  const inputPaddingTop = useSharedValue(10);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));
  const animatedInputStyle = useAnimatedStyle(() => ({
    backgroundColor: inputBgColor.value,
    borderColor: inputBorderColor.value,
    color: inputFontColor.value,
    paddingTop: inputPaddingTop.value,
    borderWidth: 2,
    paddingLeft: 25,
  }));

  const checkEmail = (value: string) => {
    if (value === '') {
      emailErrorRef.current = false;
    } else {
      emailErrorRef.current = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
  };

  // To-do: This need a enhance
  const updateState = () => {
    let bgTarget = colors.transparent;
    let inputBgTarget = colors.bg;
    let borderTarget = colors.transparent;
    let fontTarget = 'white';
    let paddingTopTarget = 0;

    if (isFocus && emailErrorRef.current) {
      bgTarget = colors.errorBlur;
      inputBgTarget = colors.transparent;
      borderTarget = colors.error;
      fontTarget = colors.error;
      paddingTopTarget = 20;
    } else if (isFocus) {
      bgTarget = colors.primaryBlur;
      inputBgTarget = colors.bg;
      borderTarget = colors.primary;
      fontTarget = 'white';
      paddingTopTarget = 20;
    } else {
      bgTarget = colors.transparent;
      inputBgTarget = colors.bg;
      borderTarget = colors.transparent;
      fontTarget = 'white';
      paddingTopTarget = 10;
    }

    bgColor.value = withTiming(bgTarget, { duration: 300 });
    inputBgColor.value = withTiming(inputBgTarget, { duration: 300 });
    inputBorderColor.value = withTiming(borderTarget, { duration: 300 });
    inputFontColor.value = withTiming(fontTarget, { duration: 300 });
    inputPaddingTop.value = withTiming(paddingTopTarget, { duration: 300 });
  };
  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleChange = (value: string) => {
    setEmail(value);
    checkEmail(value);
  };

  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus, email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Animated.View style={[styles.inputContainer, animatedStyle]}>
          <AnimatedTextInput
            style={[styles.input, animatedInputStyle]}
            placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
            placeholder={isFocus ? '' : 'Escribe tu correo electrónico'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={email}
            onChangeText={handleChange}
          />
          {isFocus && (
            <AnimatedPressable
              style={styles.xBtn}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
              onPress={() => handleChange('')}
            >
              <Text style={styles.xBtnText}>
                <XIcon />
              </Text>
            </AnimatedPressable>
          )}
          {isFocus && (
            <Animated.View
              style={styles.focusTittle}
              entering={FadeInUp.duration(300)}
              exiting={FadeOutUp.duration(300)}
            >
              <Text
                style={[
                  styles.focusTittleText,
                  emailErrorRef.current && styles.focusTittleTextError,
                ]}
              >
                Correo electrónico
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },

  input: {
    width: '100%',
    height: 60,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 18,
  },

  xBtn: {
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: [{ translateY: -10 }],
    height: 30,
    width: 30,
    backgroundColor: 'rgba(48, 48, 94, 1)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xBtnText: {
    color: 'white',
  },
  focusTittle: {
    position: 'absolute',
    top: 12,
    left: 28,
    fontSize: 12, //aca era 10 pero me parece visualmente muy pequeño asi que le di 2px extras
  },
  focusTittleText: {
    color: 'rgba(125, 119, 255, 1)',
    fontSize: 12, //aca era 10 pero me parece visualmente muy pequeño asi que le di 2px extras
  },
  focusTittleTextError: {
    color: colors.error,
    fontSize: 12, //aca era 10 pero me parece visualmente muy pequeño asi que le di 2px extras
  },
});

export default CustomInput;
