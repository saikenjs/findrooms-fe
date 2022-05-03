import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://78.142.218.131:3100/api/',
});
