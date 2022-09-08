import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {User} from '../models/User';
import {useStore} from '../store';
import {Themes} from '../themes';
import Plus from './icons/Plus';
import SendMessage from './SendMessage';

interface Props {
  user: User;

  to: number;
}

const MessageInput = ({user, to}: Props) => {
  console.log(user.id, to);

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
    if (fileName && type && uri)
      await chatStore.sendFile({fileName, type, uri}, user.id, to);
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
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    flex: 1,
  },
  text: {fontSize: Themes.FONT_SIZE_MEDIUM, flex: 1},
});

export default observer(MessageInput);
