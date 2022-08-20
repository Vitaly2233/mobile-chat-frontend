import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IChat} from '../../models/chat';
import ChatListItem from './ChatListItem';

interface Props {
  chats: IChat[];
  clickChat: (chat: IChat) => void;
}

export const ChatList = ({chats, clickChat}: Props) => {
  const renderChat = (data: any) => {
    return <ChatListItem chat={data.item} onClick={clickChat} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        data={chats}
        renderItem={renderChat}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default ChatList;
