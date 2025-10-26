import { apiRoutes } from "@/constants/route";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMyCrew, getCrewList, getCrewDetail } from "../api";
import { CrewListResponse, CrewDetail, MyCrewResponse } from "../types";

/**
 * 내 크루 조회 쿼리 훅
 * 내가 가입한 크루를 조회합니다.
 */
export const useGetMyCrewQuery = (
  options?: UseQueryOptions<MyCrewResponse | null, AxiosError>
) => {
  return useQuery({
    queryKey: [apiRoutes.crews.my],
    queryFn: getMyCrew,
    ...options,
  });
};

/**
 * 크루 목록 조회 쿼리 훅
 * 전체 크루 목록을 조회합니다.
 */
export const useGetCrewListQuery = (
  options?: UseQueryOptions<CrewListResponse, AxiosError>
) => {
  return useQuery({
    queryKey: [apiRoutes.crews.list],
    queryFn: getCrewList,
    ...options,
  });
};

/**
 * 크루 상세 조회 쿼리 훅
 * @param crewId 크루 식별자
 */
export const useGetCrewDetailQuery = (
  crewId: number,
  options?: UseQueryOptions<CrewDetail, AxiosError>
) => {
  return useQuery({
    queryKey: [apiRoutes.crews.detail(crewId)],
    queryFn: () => getCrewDetail(crewId),
    enabled: !!crewId,
    ...options,
  });
};
