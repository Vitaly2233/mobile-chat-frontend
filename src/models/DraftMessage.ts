import {IMessage} from './Message';

export interface IDraftMessage extends Omit<IMessage, 'from' | 'to'> {
  from: number;
  to: number;
}
