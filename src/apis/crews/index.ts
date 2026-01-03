import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import type {
  CrewListResponse,
  CrewDetail,
  MyCrewResponse,
  CrewMembersResponse,
  CrewUpdateRequest,
  CrewRankingsResponse,
  MemberRankingsResponse,
  CrewCreateRequest,
  CrewCreateResponse,
} from "./types";

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

/**
 * 크루 멤버 목록 조회 API
 * @param crewId 크루 식별자
 * @returns 크루 멤버 목록
 */
export const getCrewMembers = async (
  crewId: number
): Promise<CrewMembersResponse> => {
  const response = await runApi.get<CrewMembersResponse>(
    apiRoutes.crews.members(crewId)
  );
  return response.data;
};

/**
 * 크루 수정 API
 * @param crewId 크루 식별자
 * @param data 크루 수정 데이터
 * @returns 수정된 크루 정보
 */
export const updateCrew = async (
  crewId: number,
  data: CrewUpdateRequest
): Promise<CrewDetail> => {
  const response = await runApi.put<CrewDetail>(
    apiRoutes.crews.update(crewId),
    data
  );
  return response.data;
};

/**
 * 크루 랭킹 조회 API
 * @returns 크루 랭킹 목록
 */
export const getCrewRankings = async (): Promise<CrewRankingsResponse> => {
  const response = await runApi.get<CrewRankingsResponse>(
    apiRoutes.crews.rankings
  );
  return response.data;
};

/**
 * 크루원 랭킹 조회 API
 * @returns 크루원 랭킹 목록
 */
export const getMemberRankings = async (): Promise<MemberRankingsResponse> => {
  const response = await runApi.get<MemberRankingsResponse>(
    apiRoutes.crews.memberRankings
  );
  return response.data;
};

/**
 * 크루 생성 API
 * @param data 크루 생성 데이터
 * @returns 생성된 크루 정보
 */
export const createCrew = async (
  data: CrewCreateRequest
): Promise<CrewCreateResponse> => {
  const response = await runApi.post<CrewCreateResponse>(
    apiRoutes.crews.list,
    data
  );
  return response.data;
};
