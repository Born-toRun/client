import { useQuery } from "@tanstack/react-query";
import { getMemberRankings } from "../index";
import type { MemberRankingsResponse } from "../types";

/**
 * 크루원 랭킹 조회 React Query 훅
 * 크루원들의 참여 횟수 기준 랭킹을 조회합니다.
 */
export const useMemberRankings = () => {
  return useQuery<MemberRankingsResponse>({
    queryKey: ["crews", "member-rankings"],
    queryFn: getMemberRankings,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
