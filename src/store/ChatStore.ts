import {action, makeAutoObservable, observable} from 'mobx';
import {IChat} from '../models/chat';
import {IDraftMessage} from '../models/DraftMessage';
import {IMessage} from '../models/Message';
import {User} from '../models/User';
import {api} from '../utils/Api';

class ChatStore {
  @observable chats: IChat[] = [];

  @observable messages: IMessage[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setChats = (chats: IChat[]) => (this.chats = chats);

  @action setMessages = (messages: IMessage[]) => {
    this.messages = messages.map((message, i, self) => {
      let isLast = false;

      if (self.length <= i + 1) isLast = true;
      else if (self[i + 1].from?.id !== message.from?.id) isLast = true;
      return {...message, isLast};
    });
  };

  @action getUserChats = async () => {
    const res = await api.get('users/chats');
    if (res.status >= 400) throw new Error('invalid status code');
    return res.data;
  };

  @action setUserMessages = async (userId: number) => {
    const res = await api.get(`messages/user/${userId}`);
    if (res.status >= 400) throw new Error('invalid status code');
    this.setMessages(res.data);
  };

  @action sendMessage = async (to: User, from: User, text: string) => {
    if (!text.length) return;

    const message: IMessage = {from, to, text};
    this.setMessages([...this.messages, message]);
    await api.post('messages', {...message, from: from.id, to: to.id});
  };
}

export default new ChatStore();
