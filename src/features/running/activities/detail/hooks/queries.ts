import { apiRoutes } from "@/constants/route";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getActivityDetail,
  getParticipants,
  joinActivity,
  cancelParticipation,
  deleteActivity,
} from "@/apis/activity";

/**
 * 모임 상세 조회 쿼리 훅
 */
export const useGetActivityDetailQuery = (activityId: number) => {
  return useQuery({
    queryKey: [apiRoutes.activities.detail(activityId)],
    queryFn: () => getActivityDetail(activityId),
  });
};

/**
 * 참여자 목록 조회 쿼리 훅
 */
export const useGetParticipantsQuery = (activityId: number) => {
  return useQuery({
    queryKey: [apiRoutes.activities.participants(activityId)],
    queryFn: () => getParticipants(activityId),
  });
};

/**
 * 참여 예약 뮤테이션 훅
 */
export const useJoinActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => joinActivity(activityId),
    onSuccess: (_, activityId) => {
      // 모임 상세 정보 다시 조회
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.detail(activityId)],
      });
      // 모임 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
  });
};

/**
 * 참여 취소 뮤테이션 훅
 */
export const useCancelParticipationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => cancelParticipation(activityId),
    onSuccess: (_, activityId) => {
      // 모임 상세 정보 다시 조회
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.detail(activityId)],
      });
      // 모임 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
  });
};

/**
 * 모임 취소(삭제) 뮤테이션 훅
 */
export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onSuccess: () => {
      // 모임 목록 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
  });
};
