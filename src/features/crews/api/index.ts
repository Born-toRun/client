import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import type { CrewListResponse, CrewDetail, MyCrewResponse } from "../types";

/**
 * 내 크루 조회 API
 * @returns 내가 가입한 크루 정보
 */
export const getMyCrew = async (): Promise<MyCrewResponse | null> => {
  try {
    const response = await runApi.get<MyCrewResponse>(apiRoutes.crews.my);
    return response.data;
  } catch {
    // 404인 경우 가입한 크루가 없음
    return null;
  }
};

/**
 * 크루 목록 조회 API
 * @returns 크루 목록
 */
export const getCrewList = async (): Promise<CrewListResponse> => {
  const response = await runApi.get<CrewListResponse>(apiRoutes.crews.list);
  return response.data;
};

/**
 * 크루 상세 조회 API
 * @param crewId 크루 식별자
 * @returns 크루 상세 정보
 */
export const getCrewDetail = async (crewId: number): Promise<CrewDetail> => {
  const response = await runApi.get<CrewDetail>(apiRoutes.crews.detail(crewId));
  return response.data;
};
