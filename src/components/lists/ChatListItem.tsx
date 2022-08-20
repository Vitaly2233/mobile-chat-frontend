import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IChat} from '../../models/chat';
import {Themes} from '../../themes';
import CircleWithItem from '../CircleWithItem';
import SmallImage from '../SmallImage';

interface Props {
  chat: IChat;
  onClick: (chat: IChat) => void;
}

const ChatListItem = ({chat, onClick}: Props) => {
  const screenWidth = Dimensions.get('window').width;

  const imageMarginRight = 18;
  const circleWidth = 30;

  const image = (
    <SmallImage
      containerStyles={{marginRight: imageMarginRight}}
      uri={
        'https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
      }
    />
  );

  const unread = <Text style={styles.unread}>{chat.unread}</Text>;

  const rightItem =
    chat.unread > 0 ? (
      <CircleWithItem item={unread} />
    ) : (
      <View
        style={{
          width: circleWidth,
          height: circleWidth,
        }}></View>
    );

  const textContainerWidth =
    screenWidth -
    Themes.GLOBAL_HORIZONTAL_MARGIN * 2 -
    Themes.IMAGE_SIZE -
    imageMarginRight -
    circleWidth;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick(chat)}>
      <View style={styles.leftSide}>
        {image}
        <View style={{width: textContainerWidth}}>
          <Text style={styles.mainText}>
            {chat.firstName} {chat.lastName}
          </Text>
          <Text numberOfLines={2} style={styles.lastMessage}>
            {chat.lastMessage}
          </Text>
        </View>
      </View>
      {rightItem}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: Themes.FONT_SIZE_MEDIUM,
    color: Themes.BLACK_COLOR,
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: Themes.FONT_SIZE_SMALL,
    color: Themes.DARK_GRAY_COLOR,
  },
  unread: {fontSize: Themes.FONT_SIZE_SMALL, color: 'white'},
});

export default ChatListItem;
