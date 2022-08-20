import {createContext, useContext} from 'react';
import {configure, observable} from 'mobx';
import ChatStore from './ChatStore';
import UserStore from './UserStore';

configure({enforceActions: 'observed'});

class RootStore {
  @observable chatStore = ChatStore;

  @observable userStore = UserStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store)
    throw new Error('You have forgot to use StoreProvider, shame on you.');

  return store;
};

export default new RootStore();
