import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IMessage} from '../../models/Message';
import {Themes} from '../../themes';

interface Props {
  message: IMessage;
  isFromMyself?: boolean;
  isLast?: boolean;
}

const MessageListItem = ({message, isFromMyself, isLast}: Props) => {
  const containerAddition: any = {};
  if (isLast) {
    if (isFromMyself) containerAddition.borderBottomRightRadius = 0;
    else containerAddition.borderBottomLeftRadius = 0;
  }
  return isFromMyself ? (
    <View
      style={{
        ...styles.container,
        ...styles.meContainer,
        ...containerAddition,
      }}>
      <Text style={styles.myselfName}>{message.from.firstName}</Text>
      <Text style={styles.myselfMessage}>{message.text}</Text>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        ...styles.toContainer,
        ...containerAddition,
      }}>
      <Text style={styles.name}>{message.from.firstName}</Text>
      <Text style={styles.message}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    maxWidth: '70%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  meContainer: {
    backgroundColor: Themes.BLUE_COLOR,
    alignSelf: 'flex-end',
  },
  toContainer: {
    backgroundColor: Themes.GRAY_COLOR,
    alignSelf: 'flex-start',
  },
  name: {
    color: Themes.DARK_GRAY_COLOR,
    fontSize: Themes.FONT_SIZE_SMALL,
    marginBottom: 4,
  },
  myselfName: {
    color: '#B4DBFF',
    fontSize: Themes.FONT_SIZE_SMALL,
    marginBottom: 4,
  },
  message: {color: Themes.BLACK_COLOR, fontSize: Themes.FONT_SIZE_MEDIUM},
  myselfMessage: {
    color: 'white',
    fontSize: Themes.FONT_SIZE_MEDIUM,
  },
});

export default MessageListItem;
