// 토큰 리프레시 관련 타입
export interface RefreshTokenResponse {
  accessToken: string;
}

// 사용자 정보 타입 (GET /api/v1/users)
export interface User {
  id: number;
  nickname: string;
  email: string;
  profileImageUri?: string;
  instagramId?: string;
  createdAt: string;
  updatedAt: string;
}

// 내 정보 조회 타입 (GET /api/v1/users/my)
export interface MyUser {
  userId: number;
  userName: string;
  crewName: string;
  profileImageUri: string;
  isAdmin: boolean;
  isManager: boolean;
  yellowCardQty: number;
  isInstagramIdPublic: boolean;
  instagramUri: string; // 인스타그램 프로필 URL (예: https://www.instagram.com/instagramId)
  instagramId?: string; // 인스타그램 ID (API 응답에서 직접 제공)
}

// 사용자 정보 수정 요청 타입
export interface UserUpdateRequest {
  profileImageId?: number | null; // null은 프로필 이미지 삭제를 의미
  instagramId?: string;
}

// 사용자 정보 수정 응답 타입
export interface UserUpdateResponse {
  id: number;
  nickname: string;
  email: string;
  profileImageUri?: string;
  instagramId?: string;
  updatedAt: string;
}
