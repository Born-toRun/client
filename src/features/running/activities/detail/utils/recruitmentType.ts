import type { ActivityDetail, RecruitmentType } from "@/apis/activity/types";

/**
 * 모임의 모집 상태를 계산합니다.
 *
 * 우선순위:
 * 1. 백엔드가 recruitmentType을 반환하면 그 값을 사용
 * 2. 없으면 클라이언트에서 계산:
 *    - 참여 중이면 → COMPLETED
 *    - 모임 시작 시간이 지났으면 → CLOSED
 *    - 정원이 꽉 찼으면 → FULL
 *    - 그 외 → RECRUITING
 *
 * @param activity 모임 상세 정보
 * @returns 모집 상태
 */
export function getRecruitmentType(activity: ActivityDetail): RecruitmentType {
  // 백엔드가 recruitmentType을 반환하면 그것을 우선 사용
  if (activity.recruitmentType) {
    return activity.recruitmentType;
  }

  // 클라이언트에서 계산
  // 1. 참여 중이면 예약완료
  if (activity.isParticipating) {
    return "COMPLETED";
  }

  // 2. 모임 시작 시간이 지났으면 종료
  if (new Date(activity.startAt) < new Date()) {
    return "CLOSED";
  }

  // 3. 정원이 꽉 찼으면 정원마감
  if (activity.participantsQty >= activity.participantsLimit) {
    return "FULL";
  }

  // 4. 그 외 모집중
  return "RECRUITING";
}
