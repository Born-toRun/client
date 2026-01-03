"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAvailableForAttendance } from "@/apis/activity";
import { pageRoutes } from "@/constants/route";

/**
 * 출석 체크 기능을 제공하는 커스텀 훅
 *
 * 현재 출석 체크 가능한 모임을 조회하고,
 * 해당 모임의 출석 체크 페이지로 이동하는 기능을 제공합니다.
 *
 * @returns {Object} 출석 체크 관련 함수 객체
 * @property {() => Promise<void>} handleAttendanceCheck - 출석 체크 버튼 클릭 핸들러
 *
 * @example
 * ```tsx
 * const { handleAttendanceCheck } = useAttendanceCheck();
 *
 * return (
 *   <button onClick={handleAttendanceCheck}>
 *     <ClipboardCheckIcon />
 *   </button>
 * );
 * ```
 */
export function useAttendanceCheck() {
  const router = useRouter();

  /**
   * 출석 체크 가능한 모임을 조회하고 해당 페이지로 이동
   * - 출석 가능한 모임이 있으면 해당 모임의 출석 체크 페이지로 이동
   * - 출석 가능한 모임이 없으면 에러 토스트 표시
   * - API 호출 실패 시 에러 토스트 표시
   */
  const handleAttendanceCheck = async () => {
    try {
      const response = await getAvailableForAttendance();

      if (response.hasAvailableActivity && response.activityId) {
        router.push(pageRoutes.running.activities.attendance(response.activityId));
      } else {
        toast.error("현재 출석 체크 가능한 모임이 없습니다.");
      }
    } catch (error) {
      console.error("출석 체크 가능 모임 조회 실패:", error);
      toast.error("출석 체크 정보를 가져올 수 없습니다.");
    }
  };

  return {
    handleAttendanceCheck,
  };
}
