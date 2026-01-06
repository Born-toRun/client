import { apiRoutes } from "@/constants/route";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMyCrew, getCrewList, getCrewDetail, getCrewMembers } from "../api";
import { kickCrewMember } from "@/apis/crews";
import {
  CrewListResponse,
  CrewDetail,
  MyCrewResponse,
  CrewMembersResponse,
} from "../types";

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

/**
 * 크루 멤버 목록 조회 쿼리 훅
 * @param crewId 크루 식별자
 */
export const useGetCrewMembersQuery = (
  crewId: number,
  options?: UseQueryOptions<CrewMembersResponse, AxiosError>
) => {
  return useQuery({
    queryKey: [apiRoutes.crews.members(crewId)],
    queryFn: () => getCrewMembers(crewId),
    enabled: !!crewId,
    ...options,
  });
};

/**
 * 크루원 강퇴 뮤테이션 훅
 * 크루원을 강퇴하고 멤버 목록을 자동으로 갱신합니다.
 *
 * @example
 * ```tsx
 * const kickMemberMutation = useKickCrewMemberMutation(crewId);
 *
 * const handleKick = async (userId: number) => {
 *   try {
 *     await kickMemberMutation.mutateAsync(userId);
 *     toast.success("크루원이 강퇴되었습니다.");
 *   } catch (error) {
 *     toast.error("크루원 강퇴에 실패했습니다.");
 *   }
 * };
 * ```
 */
export const useKickCrewMemberMutation = (crewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => kickCrewMember(crewId, userId),
    onSuccess: () => {
      // 크루 멤버 목록 쿼리 무효화하여 최신 데이터 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.crews.members(crewId)]
      });
    },
  });
};
