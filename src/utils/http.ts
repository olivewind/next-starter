import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { cloneDeep, get, isString } from 'lodash-es';
import { Message } from '@arco-design/web-react';
import { $storage } from './storage';

function createHttp() {
  const client = axios.create({
    timeout: 1000 * 60 * 10,
    headers: {},
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const conf = cloneDeep(config);
    if (!conf.url?.startsWith('http://')) {
      conf.url = `${location.origin}/${conf.url}`;
    }
    const token = $storage.token;
    if (token) {
      conf.headers = {
        ...conf.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return conf;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (get(error, 'response.status') === 401) {
        location.href = '/login';
        return Promise.reject(error);
      }
      const message = get(error, 'response.data.message', '');
      if (message && isString(message)) {
        Message.error(message);
      }
      return Promise.reject(error);
    },
  );
  return client;
}

const $http = createHttp();

export { $http };
