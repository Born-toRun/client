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
}

// 사용자 정보 수정 요청 타입
export interface UserUpdateRequest {
  profileImageId?: number;
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
