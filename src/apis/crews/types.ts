/**
 * 크루 기본 정보
 */
export interface Crew {
  id: number;
  crewName: string;
  contents: string;
  region: string;
  imageUri?: string;
  logoUri?: string;
  crewSnsUri?: string;
}

/**
 * 크루 목록 조회 응답
 */
export interface CrewListResponse {
  details: Crew[];
}

/**
 * 내 크루 조회 응답 (단일 크루)
 * 백엔드에서 현재 사용자의 운영진 및 관리자 여부를 포함하여 반환
 */
export interface MyCrewResponse extends Crew {
  isManager: boolean;
  isAdmin: boolean;
}

/**
 * 크루 상세 정보 (현재는 목록과 동일)
 */
export type CrewDetail = Crew;

/**
 * 크루 멤버 정보
 */
export interface CrewMember {
  userId: number;
  userName: string;
  profileImageUri?: string;
  instagramId?: string;
  isManager: boolean;
  isAdmin: boolean;
}

/**
 * 크루 멤버 목록 조회 응답
 */
export interface CrewMembersResponse {
  members: CrewMember[];
}

/**
 * 크루 수정 요청
 */
export interface CrewUpdateRequest {
  imageId?: number;         // 대표이미지 ID
  logoId?: number;          // 로고이미지 ID
  name: string;             // 크루명 (필수)
  region: string;           // 크루 활동 지역 (필수)
  contents: string;         // 크루 설명 (필수)
  sns?: string;             // 크루 SNS URI (선택)
}

/**
 * 크루 랭킹 아이템
 */
export interface CrewRankingItem {
  rank: number;
  id: number;
  crewName: string;
  contents: string;
  region: string;
  imageUri?: string;
  logoUri?: string;
  crewSnsUri?: string;
  activityCount: number;
}

/**
 * 크루 랭킹 조회 응답
 */
export interface CrewRankingsResponse {
  rankings: CrewRankingItem[];
}

/**
 * 크루원 랭킹 아이템
 */
export interface MemberRankingItem {
  rank: number;
  userId: number;
  userName: string;
  profileImageUri?: string;
  instagramId?: string;
  participationCount: number;
}

/**
 * 크루원 랭킹 조회 응답
 */
export interface MemberRankingsResponse {
  rankings: MemberRankingItem[];
}
