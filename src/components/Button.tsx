import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Themes} from '../themes';

interface Props extends TouchableOpacityProps {
  text?: string;
}

const Button = (props: Props) => {
  const {text} = props;

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.BLUE_COLOR,
    borderRadius: 12,
  },
  text: {fontSize: Themes.FONT_SIZE_SMALL, color: 'white'},
});

export default Button;
