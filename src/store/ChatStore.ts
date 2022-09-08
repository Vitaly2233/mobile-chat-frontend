import {action, makeAutoObservable, observable} from 'mobx';
import {IChat} from '../models/chat';
import {FormDataFile} from '../models/FormDataFile';
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
    //TODO to is sending to myself. Fix types in typescript
    if (!text.length) return;

    const message: IMessage = {from, to, text};
    this.setMessages([...this.messages, message]);
    await api.post('messages', {...message, from: from.id, to: to.id});
  };

  @action sendFile = async (
    {fileName, type, uri}: FormDataFile,
    from: number,
    to: number,
  ) => {
    const formData = new FormData();

    formData.append('file', {
      name: fileName,
      type,
      uri,
    });

    formData.append('from', from);

    formData.append('to', to);

    const res = await api.post('messages/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.status >= 400) throw new Error('invalid status code');
  };
}

export default new ChatStore();
