import { BASE_URL } from "@/constants/api";
import HttpClient from "./httpClient";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";
import { TokenManager } from "@/utils/token";
import { showLoginModal } from "@/utils/loginBottomSheetManager";

/**
 * 토큰 갱신 중복 요청 방지를 위한 전역 플래그와 Promise
 * 여러 요청이 동시에 401을 받았을 때, 토큰 갱신은 한 번만 실행되도록 합니다.
 */
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

class RunClient extends HttpClient {
  constructor() {
    super(BASE_URL.runApiServer);
    this.instance.defaults.withCredentials = true;

    // Request Interceptor: 모든 요청에 Access Token 추가
    this.instance.interceptors.request.use((config) => {
      const token =
        typeof window !== "undefined" ? getCookie(ACCESS_TOKEN) : undefined;

      console.log("[Request Interceptor]", {
        url: config.url,
        method: config.method,
        hasToken: !!token,
        tokenPreview: token ? `${token.toString().substring(0, 20)}...` : "none",
      });

      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Response Interceptor: 401 에러 시 토큰 갱신 또는 로그인 확인 모달 표시
    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        console.log("Response interceptor triggered:", {
          status: error.response?.status,
          url: error.config?.url,
          method: error.config?.method,
          _retry: error.config?._retry,
        });

        const originalRequest = error.config;

        // 401 에러이고 아직 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log("401 error detected");
          originalRequest._retry = true;

          const currentToken =
            typeof window !== "undefined" ? getCookie(ACCESS_TOKEN) : undefined;

          if (currentToken) {
            try {
              // 이미 토큰 갱신 중인 경우, 진행 중인 Promise를 재사용
              if (isRefreshing && refreshPromise) {
                console.log(
                  "토큰 갱신이 이미 진행 중입니다. 기존 Promise를 기다립니다."
                );
                const newToken = await refreshPromise;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.instance(originalRequest);
              }

              // 토큰 갱신 시작
              console.log("토큰 갱신 시작");
              isRefreshing = true;
              refreshPromise = TokenManager.refreshAccessToken(
                currentToken.toString()
              );

              const newToken = await refreshPromise;
              console.log("토큰 갱신 성공");

              // 원래 요청에 새로운 토큰 적용하여 재시도
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            } catch (refreshError) {
              console.error("토큰 갱신 실패:", refreshError);

              // 토큰 제거
              TokenManager.removeAccessToken();

              // 로그인 확인 모달 표시 (클라이언트 사이드에서만)
              if (typeof window !== "undefined") {
                showLoginModal();
              }

              return Promise.reject(refreshError);
            } finally {
              // 토큰 갱신 완료 후 플래그 초기화
              isRefreshing = false;
              refreshPromise = null;
            }
          } else {
            // 액세스 토큰이 없는 경우 즉시 로그인 확인 모달 표시
            console.log("액세스 토큰이 없습니다. 로그인 확인 모달 표시");
            if (typeof window !== "undefined") {
              showLoginModal();
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export const runApi = new RunClient().instance;
