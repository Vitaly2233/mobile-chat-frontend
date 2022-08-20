import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Themes} from '../themes';

interface Props {
  title?: string;
  leftItem?: any;
  rightItem?: any;
}

const TabHeader = ({title, leftItem, rightItem}: Props) => {
  rightItem = rightItem ? (
    <View style={styles.itemContainer}>{rightItem}</View>
  ) : (
    <View style={styles.itemContainer}></View>
  );
  leftItem = leftItem ? (
    <View style={styles.itemContainer}>{leftItem}</View>
  ) : (
    <View style={styles.itemContainer}></View>
  );

  return (
    <View style={styles.container}>
      {leftItem || <View></View>}
      <Text style={styles.title}>{title}</Text>
      {rightItem || <View></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },

  itemContainer: {},

  title: {
    fontSize: Themes.FONT_SIZE_MEDIUM,
    color: Themes.BLACK_COLOR,
  },
});

export default TabHeader;
