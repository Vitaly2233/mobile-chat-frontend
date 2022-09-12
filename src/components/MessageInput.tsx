import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {IMessage} from '../models/Message';
import {User} from '../models/User';
import {useStore} from '../store';
import {Themes} from '../themes';
import Plus from './icons/Plus';
import SendMessage from './SendMessage';

interface Props {
  toUser: User;
}

const MessageInput = ({toUser}: Props) => {
  const {chatStore, userStore} = useStore();
  const [inputText, setInputText] = useState('');

  const handleMessageInput = (text: string) => {
    setInputText(text);
  };

  const handleMessageSend = async () => {
    if (userStore.user) {
      await chatStore.sendMessage(toUser, userStore.user, inputText);

      const message: IMessage = {
        from: userStore.user,
        to: toUser,
        text: inputText,
      };
      chatStore.setMessages([...chatStore.messages, message]);
      setInputText('');
    }
  };

  const handlePickFileCLick = async () => {
    await launchImageLibrary({mediaType: 'mixed'}, async res => {
      if (res.assets) {
        const asset = res.assets[0];
        if (asset.uri) {
          await handleImageUpload(asset);
        }
      }
    });
  };

  const handleImageUpload = async ({fileName, type, uri}: Asset) => {
    if (fileName && type && uri && userStore.user)
      await chatStore.sendFile(
        {fileName, type, uri},
        userStore.user.id,
        toUser.id,
      );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plus} onPress={handlePickFileCLick}>
        <Plus />
      </TouchableOpacity>
      <View style={{...styles.input}}>
        <TextInput
          value={inputText}
          style={{...styles.text, height: 50}}
          placeholder={'Message...'}
          onChangeText={text => handleMessageInput(text)}
        />
        <SendMessage
          containerStyles={{height: 50, width: 50}}
          onCLick={() => handleMessageSend()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  plus: {
    marginRight: Themes.GLOBAL_HORIZONTAL_MARGIN - 5,
    padding: 5,
  },
  input: {
    backgroundColor: Themes.GRAY_COLOR,
    borderRadius: 70,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    flex: 1,
  },
  text: {fontSize: Themes.FONT_SIZE_MEDIUM, flex: 1},
});

export default observer(MessageInput);
