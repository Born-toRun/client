/**
 * 모임 목록 조회 파라미터
 */
export interface ActivityListParams {
  courses?: string; // 코스 리스트 (예: "5km,10km")
  recruitmentType?: string; // 모집 상태 (RECRUITING, FULL, COMPLETED, CLOSED)
}

/**
 * 모집 상태 타입
 */
export type RecruitmentType = "RECRUITING" | "FULL" | "COMPLETED" | "CLOSED" | "ALREADY_PARTICIPATING";

/**
 * 코스 타입
 */
export type CourseType = "5km" | "10km" | "하프" | "풀" | "기타";

/**
 * 모임 기본 정보
 */
export interface Activity {
  id: number;
  title: string;
  startAt: string; // ISO 8601 날짜
  course: CourseType;
  participantsQty: number; // 현재 참여자 수
  participantsLimit: number; // 최대 참여자 수
  recruitmentType: RecruitmentType;
  imageUrls: string[]; // 모임 이미지 URL 목록
}

/**
 * 모임 목록 조회 응답
 */
export interface ActivityListResponse {
  details: Activity[];
}

/**
 * 호스트 정보
 */
export interface Host {
  userId: number;
  userName: string;
  crewName?: string;
  profileImageUri?: string;
  isAdmin: boolean;
  isManager: boolean;
}

/**
 * 참여자 정보
 */
export interface Participant {
  userId: number;
  userName: string;
  crewName?: string;
  profileImageUri?: string;
  isAdmin: boolean;
  isManager: boolean;
}

/**
 * 모임 상세 정보
 */
export interface ActivityDetail {
  id: number;
  title: string;
  contents: string;
  startAt: string; // ISO 8601 날짜
  venue: string; // 장소
  venueUrl?: string; // 장소 URL (지도 링크 등)
  course: CourseType;
  path?: string; // 경로 (백엔드 필드명과 일치)
  participantsLimit: number;
  participantsQty: number;
  participationFee?: number; // 회비 (백엔드 필드명과 일치)
  courseDetail?: string; // 코스 설명
  recruitmentType?: RecruitmentType; // 백엔드가 반환하지 않을 수 있음 (클라이언트에서 계산)
  precautions?: string; // 유의사항
  host: Host;
  updatedAt: string; // ISO 8601 날짜
  isMyActivity: boolean; // 작성자 여부
  isParticipating: boolean; // 참여 여부
  isOpen?: boolean; // 출석 코드 활성화 여부
  attendanceCode?: number; // 출석 코드 (작성자만) - 백엔드는 number로 반환
  attendanceExpiresAt?: string; // 출석 코드 만료 시간
  isAttended?: boolean; // 출석 완료 여부
  imageUrls: string[]; // 모임 이미지 URL 목록
}

/**
 * 참여자 목록 조회 응답
 */
export interface ParticipantsResponse {
  host: Host;
  participants: Participant[];
}

/**
 * 참여 예약/취소 응답
 */
export interface ParticipationResponse {
  activityId: number;
}

/**
 * 모임 등록 요청
 */
export interface CreateActivityRequest {
  imageIds?: number[]; // 업로드된 이미지 ID 배열
  title: string;
  contents: string;
  startAt: string; // ISO 8601 format
  venue: string; // 장소
  venueUrl: string; // 장소 URL
  participantsLimit: number; // -1 for unlimited
  participationFee: number; // 회비
  course?: string; // 코스
  courseDetail?: string; // 코스 설명
  path?: string; // 경로
}

/**
 * 모임 수정 요청
 */
export interface UpdateActivityRequest {
  imageIds?: number[]; // 업로드된 이미지 ID 배열
  title: string;
  contents: string;
  startAt: string; // ISO 8601 format
  venue: string; // 장소
  venueUrl: string; // 장소 URL
  participantsLimit: number; // -1 for unlimited
  participationFee: number; // 회비
  course?: string; // 코스
  courseDetail?: string; // 코스 설명
  path?: string; // 경로
}

/**
 * 모임 등록 응답
 */
export interface CreateActivityResponse {
  activityId: number;
}

/**
 * 출석 코드 생성 응답
 */
export interface OpenActivityResponse {
  attendanceCode: number; // 4자리 코드
  expiresAt: string; // 만료 시간
}

/**
 * 출석 체크 요청
 */
export interface AttendanceRequest {
  code: string; // 4자리 코드
}

/**
 * 출석 가능한 모임 조회 응답
 */
export interface AvailableForAttendanceResponse {
  hasAvailableActivity: boolean;
  activityId: number | null;
}
