import { apiRoutes } from "@/constants/route";
import { BASE_URL } from "../../constants/api";
import { RefreshTokenResponse } from "./types";

/**
 * 토큰 리프레시 API
 * 만료된 access token을 refresh token으로 재발급받습니다.
 *
 * 주의: runApi 대신 fetch를 사용하는 이유
 * - runApi를 사용하면 interceptor를 거쳐 무한 루프 발생 가능
 * - 토큰 리프레시 API 자체가 401을 반환할 경우 다시 토큰 리프레시 시도
 * - 따라서 인터셉터를 거치지 않는 직접적인 fetch 호출이 필요
 *
 * @param expiredAccessToken - 만료된 access token
 * @returns 새로운 access token
 */
export const refreshToken = async (
  expiredAccessToken: string
): Promise<RefreshTokenResponse> => {
  const response = await fetch(
    `${BASE_URL.runApiServer}${apiRoutes.users.refresh}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${expiredAccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", // 쿠키 포함
    }
  );

  if (!response.ok) {
    throw new Error("토큰 리프레시에 실패했습니다.");
  }

  return response.json();
};
