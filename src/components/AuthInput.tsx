import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Themes} from '../themes';

interface Props extends TextInputProps {}

const AuthInput = (props: Props) => {
  return <TextInput style={styles.container} {...props}></TextInput>;
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Themes.BLUE_COLOR,
    fontSize: Themes.FONT_SIZE_MEDIUM,
  },
});

export default AuthInput;
