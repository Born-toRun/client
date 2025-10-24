/**
 * 모집 상태 필터 옵션
 */
export const RECRUITMENT_TYPE_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "RECRUITING", label: "모집중" },
  { value: "FULL", label: "정원마감" },
  { value: "COMPLETED", label: "예약완료" },
  { value: "CLOSED", label: "종료" },
] as const;

/**
 * 코스 필터 옵션 (다중 선택 가능)
 */
export const ACTIVITY_COURSE_OPTIONS = [
  { value: "5km", label: "5km" },
  { value: "10km", label: "10km" },
  { value: "하프", label: "하프" },
  { value: "풀", label: "풀" },
  { value: "기타", label: "기타" },
] as const;

/**
 * 모집 상태별 배지 색상
 */
export const RECRUITMENT_TYPE_COLORS = {
  RECRUITING: "bg-rg-400 text-white", // 모집중 - 메인 색상
  FULL: "bg-n-60 text-white", // 정원마감 - 그레이
  COMPLETED: "bg-rg-300 text-white", // 예약완료 - 밝은 그린
  CLOSED: "bg-n-40 text-white", // 종료 - 연한 그레이
} as const;

/**
 * 모집 상태 라벨
 */
export const RECRUITMENT_TYPE_LABELS = {
  RECRUITING: "모집중",
  FULL: "정원마감",
  COMPLETED: "예약완료",
  CLOSED: "종료",
} as const;
