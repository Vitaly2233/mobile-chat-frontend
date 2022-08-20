import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {User} from '../models/User';
import {useStore} from '../store';
import {Themes} from '../themes';
import SendMessage from './SendMessage';

interface Props {
  user: User;
}

const MessageInput = ({user}: Props) => {
  const {chatStore, userStore} = useStore();
  const [inputText, setInputText] = useState('');

  const handleMessageInput = (text: string) => {
    setInputText(text);
  };

  const handleMessageSend = async () => {
    if (userStore.user) {
      await chatStore.sendMessage(user, userStore.user, inputText);
      setInputText('');
    }
  };

  return (
    <View style={{...styles.container}}>
      <TextInput
        value={inputText}
        style={{...styles.text, height: 50}}
        placeholder={'Message...'}
        onChangeText={text => handleMessageInput(text)}></TextInput>
      <SendMessage
        containerStyles={{height: 50, width: 50}}
        onCLick={() => handleMessageSend()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.GRAY_COLOR,
    borderRadius: 70,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
  },
  text: {fontSize: Themes.FONT_SIZE_MEDIUM, flex: 1},
});

export default observer(MessageInput);
