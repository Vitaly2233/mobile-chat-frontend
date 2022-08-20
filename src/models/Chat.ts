import {User} from './User';

export interface IChat extends User {
  lastMessage: string;
  unread: number;
}
