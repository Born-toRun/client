import { RefreshTokenResponse } from "./types";
import { BASE_URL } from "../../constants/api";

/**
 * 토큰 리프레시 API
 * 만료된 access token을 refresh token으로 재발급받습니다.
 * @param expiredAccessToken - 만료된 access token
 * @returns 새로운 access token
 */
export const refreshToken = async (
  expiredAccessToken: string
): Promise<RefreshTokenResponse> => {
  const response = await fetch(
    `${BASE_URL.runApiServer}/api/v1/users/refresh`,
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
