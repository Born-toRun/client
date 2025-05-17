import { BASE_URL } from '@/constants/api';
import HttpClient from './httpClient';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN } from '@/constants/common';

class RunClient extends HttpClient {
  constructor() {
    super(BASE_URL.runApiServer);
    this.instance.defaults.withCredentials = true;

    this.instance.interceptors.request.use((config) => {
      const token =
        typeof window !== 'undefined' ? getCookie(ACCESS_TOKEN) : undefined;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export const runApi = new RunClient().instance;
