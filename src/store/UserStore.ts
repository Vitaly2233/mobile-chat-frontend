import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeAutoObservable, observable} from 'mobx';
import {LoginData} from '../models/LoginData';
import {User} from '../models/User';
import {api} from '../utils/Api';

class UserStore {
  @observable user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  @action login = async (dto: LoginData) => {
    const res = await api.post('users', dto);
    if (res.status >= 400) throw new Error('error while login');
    return res.data;
  };

  @action logout = async () => {
    delete api.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem('access_token');
    this.user = undefined;
  };

  @action setToken = async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  @action setMe = async () => {
    const res = await api.get('users/me');
    if (res.status >= 400) throw new Error('error while login');
    this.user = res.data;
  };
}

export default new UserStore();
