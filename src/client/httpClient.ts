import axios, { AxiosInstance } from 'axios';

class HttpClient {
  public instance: AxiosInstance;
  private baseURL?: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;

    this.instance = axios.create({
      baseURL: this.baseURL,
      // 임시 timeout
      timeout: 10000,
    });
  }
}

export default HttpClient;
