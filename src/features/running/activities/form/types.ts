/**
 * 모임 폼 데이터 타입
 */
export interface ActivityFormData {
  title: string;
  contents: string;
  startAt: string; // datetime-local format: YYYY-MM-DDTHH:mm
  venue: string; // 장소
  venueUrl: string; // 장소 URL
  participantsLimit: number; // -1 for unlimited
  participationFee: number; // 회비
  course: string; // 코스
  courseDetail: string; // 코스 설명
  path: string; // 경로
}

/**
 * 모임 폼 모드
 */
export type ActivityFormMode = "create" | "edit";
