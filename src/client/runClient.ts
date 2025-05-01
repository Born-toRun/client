import { BASE_URL } from '@/constants/api';
import HttpClient from './httpClient';

class RunClient extends HttpClient {
  constructor() {
    super(BASE_URL.runApiServer);
    this.instance.defaults.withCredentials = true;

    this.instance.interceptors.request.use((config) => {
      return config;
    });

    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        // error handler
      }
    );
  }
}

export const runApi = new RunClient().instance;
