import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MessageList from '../components/lists/MessageList';
import MessageInput from '../components/MessageInput';
import {RootStackParamsList} from '../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamsList, 'Chat'>;

const Chat = ({route, navigation}: Props) => {
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <MessageList userId={id} />
      <MessageInput user={route.params} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Chat;
