import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Themes} from '../themes';
import SendMessageIcon from './icons/SendMessageIcon';
interface Props {
  containerStyles?: any;
  onCLick: () => void;
}

const SendMessage = (props: Props) => {
  return (
    <View
      style={{...styles.container, ...props.containerStyles}}
      onTouchStart={() => props.onCLick()}>
      <SendMessageIcon width={20} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.BLUE_COLOR,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendMessage;
