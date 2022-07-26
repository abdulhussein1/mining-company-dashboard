import axios from 'axios';
// import { useSelector } from 'react-redux';
import { BASE_URL } from './Config';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('appState');
  if (token && !config.headers.Authorization) {
    const { registerReducer } = JSON.parse(token);
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${registerReducer.userToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

const api = {
  get: (url, params = {}, header = {}) => instance({
    method: 'GET',
    url,
    params,
    headers: { 'Content-Type': 'application/json', ...header },
    transformResponse: [(data) => JSON.parse(data)],
  }),
  post: (url, params = {}) => instance({
    method: 'POST',
    url,
    data: params,
    headers: { 'Content-Type': 'application/json' },
    transformResponse: [(data) => JSON.parse(data)],
  }),
  put: (url, params = {}, header = {}) => instance({
    method: 'PUT',
    url,
    data: params,
    headers: { 'Content-Type': 'application/json', ...header },
    transformResponse: [(data) => JSON.parse(data)],
  }),
  delete: (url, params = {}, header = {}) => instance({
    method: 'DELETE',
    url,
    data: params,
    headers: { 'Content-Type': 'application/json', ...header },
    transformResponse: [(data) => JSON.parse(data)],
  }),
};
export default api;
