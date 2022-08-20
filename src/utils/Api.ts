import axios from 'axios';
import {Config} from './Config';

export const api = axios.create({
  baseURL: Config.API_BASE_URL,
  validateStatus: status => status >= 200 && status < 500,
});
