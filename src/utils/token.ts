import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";
import { refreshToken } from "@/apis/users";

/**
 * 토큰 관리 유틸리티 클래스
 */
export class TokenManager {
  /**
   * 현재 저장된 access token을 가져옵니다.
   * @returns access token 또는 null
   */
  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return (getCookie(ACCESS_TOKEN) as string) || null;
  }

  /**
   * access token을 쿠키에 저장합니다.
   * @param token - 저장할 access token
   */
  static setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    setCookie(ACCESS_TOKEN, token);
  }

  /**
   * access token을 쿠키에서 삭제합니다.
   */
  static removeAccessToken(): void {
    if (typeof window === "undefined") return;
    deleteCookie(ACCESS_TOKEN);
  }

  /**
   * 만료된 토큰으로 새로운 토큰을 발급받습니다.
   * @param expiredToken - 만료된 access token
   * @returns 새로운 access token
   */
  static async refreshAccessToken(expiredToken: string): Promise<string> {
    try {
      const response = await refreshToken(expiredToken);
      this.setAccessToken(response.accessToken);
      return response.accessToken;
    } catch (error) {
      // 토큰 리프레시 실패 시 기존 토큰 삭제
      this.removeAccessToken();
      throw error;
    }
  }

  /**
   * 토큰이 유효한지 확인합니다.
   * @param token - 확인할 토큰
   * @returns 토큰이 존재하면 true, 없으면 false
   */
  static hasValidToken(token?: string): boolean {
    return Boolean(token || this.getAccessToken());
  }
}
