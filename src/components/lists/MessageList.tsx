import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {IMessage} from '../../models/Message';
import {useStore} from '../../store';
import MessageListItem from './MessageListItem';

interface Props {
  userId: number;
}

let interval;
export const MessageList = ({userId}: Props) => {
  const {chatStore, userStore} = useStore();
  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await chatStore.setUserMessages(userId);

    if (!interval)
      interval = setInterval(async () => {
        await chatStore.checkNewMessages();
      }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  const renderMessages = (data: any) => {
    const message = data.item as IMessage;

    const itemProps: any = {isLast: message.isLast};
    if (userStore.user && message.from.id === userStore.user.id)
      itemProps.isFromMyself = true;

    return <MessageListItem message={message} {...itemProps} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
        ref={flatListRef}
        scrollEnabled={true}
        data={chatStore.messages}
        renderItem={renderMessages}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default observer(MessageList);
