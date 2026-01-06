import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity, updateActivity } from "@/apis/activity";
import { apiRoutes } from "@/constants/route";
import type {
  CreateActivityRequest,
  UpdateActivityRequest,
} from "@/apis/activity/types";

/**
 * 모임 등록 뮤테이션 훅
 */
export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateActivityRequest) => createActivity(data),
    onSuccess: () => {
      // 모임 목록 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
  });
};

/**
 * 모임 수정 뮤테이션 훅
 */
export const useUpdateActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      data,
    }: {
      activityId: number;
      data: UpdateActivityRequest;
    }) => updateActivity(activityId, data),
    onSuccess: (_, { activityId }) => {
      // 모임 상세 정보 무효화
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
