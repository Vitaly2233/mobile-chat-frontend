import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {io} from 'socket.io-client';
import {useFocusEffect} from '@react-navigation/native';
import MessageList from '../components/lists/MessageList';
import MessageInput from '../components/MessageInput';
import {useStore} from '../store';
import {RootStackParamsList} from '../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamsList, 'Chat'>;

const Chat = ({route, navigation}: Props) => {
  const {id} = route.params;
  const {chatStore, userStore} = useStore();
  const socket = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      init();
      return () => {
        socket.current.disconnect();
      };
    }, []),
  );

  const init = async () => {
    await chatStore.setUserMessages(id);
    const token = await AsyncStorage.getItem('access_token');
    if (!token) return;

    socket.current = io('ws://192.168.0.101:3001', {extraHeaders: {token}});

    socket.current.on('connect', () => {
      console.log('connected');
    });

    socket.current.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.current.on('new-message', data => {
      chatStore.setMessages([...chatStore.messages, data]);
    });
  };

  return (
    <View style={styles.container}>
      <MessageList messages={chatStore.messages} user={userStore.user} />
      <MessageInput user={route.params} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default observer(Chat);
