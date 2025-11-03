import { apiRoutes } from "@/constants/route";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getActivityList, getMyParticipations } from "@/apis/activity";
import {
  ActivityListParams,
  ActivityListResponse,
} from "@/apis/activity/types";

/**
 * 모임 목록 조회 쿼리 훅
 */
export const useGetActivityListQuery = (
  params: ActivityListParams,
  options?: UseQueryOptions<ActivityListResponse, AxiosError>
) => {
  const { courses, recruitmentType } = params;

  return useQuery({
    queryKey: [apiRoutes.activities.list, courses, recruitmentType],
    queryFn: () => getActivityList(params),
    placeholderData: keepPreviousData,
    ...options,
  });
};

/**
 * 내가 참여한 모임 목록 조회 쿼리 훅
 */
export const useGetMyParticipationsQuery = (
  options?: UseQueryOptions<ActivityListResponse, AxiosError>
) => {
  return useQuery({
    queryKey: [apiRoutes.activities.myParticipations],
    queryFn: () => getMyParticipations(),
    ...options,
  });
};
