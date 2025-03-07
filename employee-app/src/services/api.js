import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sua-api.com',
});

export default api;