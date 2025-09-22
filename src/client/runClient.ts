import { BASE_URL } from "@/constants/api";
import HttpClient from "./httpClient";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";
import { TokenManager } from "@/utils/token";

class RunClient extends HttpClient {
  constructor() {
    super(BASE_URL.runApiServer);
    this.instance.defaults.withCredentials = true;

    this.instance.interceptors.request.use((config) => {
      const token =
        typeof window !== "undefined" ? getCookie(ACCESS_TOKEN) : undefined;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;

        // 401 에러이고 아직 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const currentToken = TokenManager.getAccessToken();

          if (currentToken) {
            try {
              // 토큰 리프레시 시도
              const newToken = await TokenManager.refreshAccessToken(
                currentToken
              );

              // 새로운 토큰으로 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            } catch (refreshError) {
              // 토큰 리프레시 실패 시 로그인 페이지로 리다이렉트 또는 에러 처리
              console.error("토큰 리프레시 실패:", refreshError);
              TokenManager.removeAccessToken();

              // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
              if (typeof window !== "undefined") {
                window.location.href = "/login";
              }

              return Promise.reject(refreshError);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export const runApi = new RunClient().instance;
