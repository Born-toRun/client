import { apiRoutes } from "@/constants/route";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMyFeeds } from "../index";
import { MyFeedsResponse } from "../types";

/**
 * 내 피드 목록 조회 React Query 훅
 *
 * @param options - React Query 옵션
 * @returns useQuery 결과 (data, isPending, isError 등)
 */
export const useMyFeeds = (
  options?: Partial<UseQueryOptions<MyFeedsResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: [apiRoutes.feeds.my],
    queryFn: () => getMyFeeds(),
    ...options,
  });
};
