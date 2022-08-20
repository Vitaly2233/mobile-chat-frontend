import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Themes} from '../themes';

interface Props {
  text: string;
}

const LinkText = ({text}: Props) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {fontSize: Themes.FONT_SIZE_SMALL, color: Themes.BLUE_COLOR},
});

export default LinkText;
