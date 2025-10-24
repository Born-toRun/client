import { runningTabLabel } from "../../constants";

/**
 * 러닝 탭 타입
 */
export type RunningTab = keyof typeof runningTabLabel;

/**
 * 모임 필터 타입
 */
export interface ActivityFilters {
  recruitmentType: string;
  courses: string[]; // 다중 선택 가능
}
