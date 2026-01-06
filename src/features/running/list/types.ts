import { runningTabLabel } from "../constants";

/**
 * 러닝 탭 타입
 */
export type RunningTab = keyof typeof runningTabLabel;

/**
 * 필터 타입
 */
export interface MarathonFilters {
  region: string;
  course: string;
}
