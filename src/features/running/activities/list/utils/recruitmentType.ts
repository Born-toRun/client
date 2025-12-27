import type { Activity, RecruitmentType } from "@/apis/activity/types";

/**
 * 모임 목록에서 모집 상태를 계산합니다.
 *
 * 우선순위:
 * 1. 백엔드가 유효한 recruitmentType을 반환하면 그 값을 사용
 * 2. 없거나 예상치 못한 값이면 클라이언트에서 계산:
 *    - 모임 시작 시간이 지났으면 → CLOSED
 *    - 정원이 꽉 찼으면 → FULL
 *    - 그 외 → RECRUITING
 *
 * @param activity 모임 정보
 * @returns 모집 상태
 */
export function getRecruitmentTypeForList(activity: Activity): RecruitmentType {
  // 유효한 모집 상태 타입 목록
  const validTypes: RecruitmentType[] = [
    "RECRUITING",
    "FULL",
    "COMPLETED",
    "CLOSED",
    "ALREADY_PARTICIPATING",
  ];

  // 백엔드가 유효한 recruitmentType을 반환하면 그것을 우선 사용
  if (
    activity.recruitmentType &&
    validTypes.includes(activity.recruitmentType)
  ) {
    return activity.recruitmentType;
  }

  // 클라이언트에서 계산
  // 1. 모임 시작 시간이 지났으면 종료
  if (new Date(activity.startAt) < new Date()) {
    return "CLOSED";
  }

  // 2. 정원이 꽉 찼으면 정원마감
  if (activity.participantsQty >= activity.participantsLimit) {
    return "FULL";
  }

  // 3. 그 외 모집중
  return "RECRUITING";
}
