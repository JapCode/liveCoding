import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// @ts-ignore
import XIcon from '../assets/xIcon.svg';

const CustomInput = () => {
  // const [xBtn, setXBtn] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const checkEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            isFocus
              ? emailError
                ? styles.inputContainerError
                : styles.inputContainerFocus
              : '',
          ]}
        >
          <TextInput
            style={[
              styles.input,
              isFocus
                ? emailError
                  ? styles.inputError
                  : styles.inputFocus
                : '',
            ]}
            placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
            placeholder={isFocus ? '' : 'Escribe tu correo electrónico'}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={email}
            onChangeText={value => {
              setEmail(value);
              checkEmail(value);
            }}
          />
          {isFocus && (
            <View style={styles.xBtn}>
              <Text style={styles.xBtnText}>
                <XIcon />
              </Text>
            </View>
          )}
          {isFocus && (
            <View style={styles.focusTittle}>
              <Text
                style={[
                  styles.focusTittleText,
                  emailError && styles.focusTittleTextError,
                ]}
              >
                Correo electrónico
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const colors = {
  primary: 'rgba(120, 113, 255, 1)',
  primaryBlur: 'rgba(125, 119, 255, 0.2)',
  error: 'rgba(180, 75, 75, 1)',
  errorBlur: 'rgba(180, 75, 75, 0.1)',
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
  inputContainerFocus: {
    borderRadius: 20,
    backgroundColor: colors.primaryBlur,
  },
  inputContainerError: {
    borderRadius: 20,
    backgroundColor: colors.errorBlur,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#141534',
    color: '#FFFFFF',
    borderWidth: 1,
    paddingLeft: 25,
    borderRadius: 15,
    fontSize: 18,
  },
  inputFocus: {
    paddingTop: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  inputError: {
    paddingTop: 20,
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: colors.errorBlur,
    color: colors.error,
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
