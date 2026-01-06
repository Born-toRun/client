import { useQuery } from "@tanstack/react-query";
import { getCrewRankings } from "../index";
import type { CrewRankingsResponse } from "../types";

/**
 * 크루 랭킹 조회 React Query 훅
 * 크루들의 활동 횟수 기준 랭킹을 조회합니다.
 */
export const useCrewRankings = () => {
  return useQuery<CrewRankingsResponse>({
    queryKey: ["crews", "rankings"],
    queryFn: getCrewRankings,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
