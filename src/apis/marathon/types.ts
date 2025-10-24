/**
 * 마라톤 목록 조회 파라미터
 * 현재 백엔드 API는 필터링을 지원하지 않지만 향후 확장을 위해 유지
 */
export interface MarathonListParams {
  region?: string; // 지역 필터 (향후 지원 예정)
  course?: string; // 코스 필터 (향후 지원 예정)
}

/**
 * 마라톤 기본 정보
 */
export interface Marathon {
  id: number;
  title: string;
  schedule: string; // ISO 8601 날짜
  venue: string; // 장소
  course: string; // 코스 (5km, 10km, 하프, 풀, 기타)
  isBookmarking: boolean; // 백엔드 API 필드명
}

/**
 * 마라톤 목록 조회 응답
 * 백엔드는 페이지네이션 없이 전체 리스트를 반환
 */
export interface MarathonListResponse {
  details: Marathon[];
}

/**
 * 북마크 추가/취소 응답
 */
export interface BookmarkResponse {
  marathonId: number;
}

/**
 * 마라톤 상세 정보
 */
export interface MarathonDetail {
  id: number;
  title?: string; // 대회명
  owner?: string; // 대표자명
  email?: string; // 대표자 이메일
  schedule?: string; // 대회 일시
  contact?: string; // 전화번호
  course?: string; // 대회 코스
  location?: string; // 대회 지역
  venue?: string; // 대회 장소
  host?: string; // 주최 단체
  duration?: string; // 신청 기간
  homepage?: string; // 홈페이지
  venueDetail?: string; // 장소 상세
  remark?: string; // 추가 소개
  registeredAt: string; // 등록 일시
  isBookmarking?: boolean; // 북마크 여부
}
