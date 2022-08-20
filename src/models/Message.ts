import {User} from './User';

export interface IMessage {
  id?: string;
  text: string;
  isLast?: boolean;
  from: User;
  to: User;
}
