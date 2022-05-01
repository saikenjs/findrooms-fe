import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NODE_ENV
    ? 'http://localhost:3001'
    : 'https://98675f8094954d.lhrtunnel.link',
});
