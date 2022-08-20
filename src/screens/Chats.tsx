import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ChatList from '../components/lists/ChatList';
import SearchBar from '../components/SearchBar';
import {IChat} from '../models/chat';
import {useStore} from '../store';
import {RootStackParamsList} from '../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamsList, 'Chats'>;

const Chats = ({navigation}: Props) => {
  const {chatStore, userStore} = useStore();
  const [chats, setChats] = useState(chatStore.chats);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const userChats = (await chatStore.getUserChats()).filter(
        (chat: IChat) => userStore.user && chat.id !== userStore.user.id,
      );
      chatStore.setChats(userChats);
      setChats(userChats);
    } catch (e: any) {
      alert('error while getting chats ' + e.message);
    }
  };

  const handleClickChat = (chat: IChat) => {
    navigation.push('Chat', chat);
  };

  const handleTextChange = (text: string) => {
    const chats = chatStore.chats;

    const filtered = chats.filter(chat => {
      const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
      let isMatched = false;
      try {
        isMatched = !!fullName.match(text.toLowerCase());
      } catch (e) {
        isMatched = false;
      }
      return isMatched;
    });
    setChats(filtered);
  };

  return (
    <View style={styles.container}>
      <SearchBar onTextChange={handleTextChange} />
      <ChatList chats={chats} clickChat={handleClickChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default observer(Chats);
