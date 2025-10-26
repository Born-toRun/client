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
 */
export type MyCrewResponse = Crew;

/**
 * 크루 상세 정보 (현재는 목록과 동일)
 */
export type CrewDetail = Crew;
