import React from 'react';
import {StyleSheet, View} from 'react-native';
import Circle from './icons/Circle';

interface Props {
  item: JSX.Element;
}

const CircleWithItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <Circle />
      <View style={styles.item}>{item}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {position: 'absolute'},
});

export default CircleWithItem;
