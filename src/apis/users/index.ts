import { apiRoutes } from "@/constants/route";
import { BASE_URL } from "../../constants/api";
import { runApi } from "@/client/runClient";
import type {
  RefreshTokenResponse,
  User,
  MyUser,
  UserUpdateRequest,
  UserUpdateResponse,
} from "./types";

/**
 * 토큰 리프레시 API
 * 만료된 access token을 refresh token으로 재발급받습니다.
 *
 * 주의: runApi 대신 fetch를 사용하는 이유
 * - runApi를 사용하면 interceptor를 거쳐 무한 루프 발생 가능
 * - 토큰 리프레시 API 자체가 401을 반환할 경우 다시 토큰 리프레시 시도
 * - 따라서 인터셉터를 거치지 않는 직접적인 fetch 호출이 필요
 *
 * 백엔드 API 스펙:
 * - Headers: Authorization: Bearer {expired_access_token}
 * - Cookies: refresh_token (자동으로 포함됨)
 * - Response: { "accessToken": "new.access.token" }
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
        "Content-Type": "application/json",
      },
      credentials: "include", // refresh_token 쿠키 포함
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("토큰 리프레시 실패:", {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    });
    throw new Error(
      `토큰 리프레시에 실패했습니다. (${response.status}: ${response.statusText})`
    );
  }

  return response.json();
};

/**
 * 사용자 정보 조회 API (레거시)
 * @deprecated 대신 getMyUser를 사용하세요
 * @returns 현재 로그인한 사용자 정보
 */
export const getUser = async (): Promise<User> => {
  const response = await runApi.get<User>("/api/v1/users");
  return response.data;
};

/**
 * 내 정보 조회 API
 * 현재 로그인한 사용자의 상세 정보를 조회합니다.
 * 프로필 이미지와 인스타그램 URI를 포함합니다.
 *
 * @returns 내 상세 정보
 */
export const getMyUser = async (): Promise<MyUser> => {
  const response = await runApi.get<MyUser>("/api/v1/users/my");
  return response.data;
};

/**
 * 사용자 정보 수정 API
 * 프로필 이미지와 인스타그램 ID를 수정합니다.
 *
 * @param data - 수정할 사용자 정보
 * @returns 수정된 사용자 정보
 */
export const updateUser = async (
  data: UserUpdateRequest
): Promise<UserUpdateResponse> => {
  const response = await runApi.put<UserUpdateResponse>(
    "/api/v1/users",
    data
  );
  return response.data;
};

/**
 * 회원탈퇴 API
 * 현재 로그인한 사용자의 계정을 삭제합니다.
 *
 * 주의사항:
 * - 탈퇴 후 모든 사용자 데이터가 삭제되며 복구할 수 없습니다.
 * - 탈퇴 후 자동으로 로그아웃 처리가 필요합니다.
 *
 * 백엔드 API 스펙:
 * - Method: DELETE
 * - Path: /api/v1/users
 * - Headers: Authorization: Bearer {access_token}
 * - Response: 200 OK (no body)
 *
 * @returns void (200 OK response)
 */
export const deleteUser = async (): Promise<void> => {
  await runApi.delete("/api/v1/users");
};
