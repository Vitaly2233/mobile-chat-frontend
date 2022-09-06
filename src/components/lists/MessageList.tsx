import React, {useRef} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {IMessage} from '../../models/Message';
import MessageListItem from './MessageListItem';
import {User} from '../../models/User';

interface Props {
  messages: any[];
  user?: User;
}

export const MessageList = ({messages, user}: Props) => {
  const flatListRef = useRef<FlatList>();

  const renderMessages = (data: any) => {
    const message = data.item as IMessage;

    const itemProps: any = {isLast: message.isLast};
    if (user && message.from.id === user.id) itemProps.isFromMyself = true;

    return <MessageListItem message={message} {...itemProps} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
        ref={flatListRef}
        scrollEnabled={true}
        data={messages}
        renderItem={renderMessages}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default MessageList;
