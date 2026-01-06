import { apiRoutes } from "@/constants/route";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getActivityDetail,
  getParticipants,
  joinActivity,
  cancelParticipation,
  deleteActivity,
} from "@/apis/activity";
import { AxiosError } from "axios";

/**
 * 모임 상세 조회 쿼리 훅
 */
export const useGetActivityDetailQuery = (activityId: number) => {
  return useQuery({
    queryKey: [apiRoutes.activities.detail(activityId)],
    queryFn: () => getActivityDetail(activityId),
    staleTime: 0, // 데이터를 즉시 stale로 표시
    refetchOnMount: "always", // 페이지 재진입 시 항상 재조회
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
      // 성공 토스트 표시
      toast.success("예약이 완료되었습니다!", {
        description: "모임 당일에 출석체크를 잊지 마세요.",
      });

      // 모임 상세 정보 다시 조회
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.detail(activityId)],
      });
      // 참여자 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.participants(activityId)],
      });
      // 모임 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
    onError: (error: AxiosError) => {
      // 에러 메시지 추출
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "예약에 실패했습니다.";

      // 에러 토스트 표시
      toast.error(errorMessage, {
        description: "잠시 후 다시 시도해주세요.",
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
      // 성공 토스트 표시
      toast.success("예약이 취소되었습니다.", {
        description: "언제든 다시 참여하실 수 있습니다.",
      });

      // 모임 상세 정보 다시 조회
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.detail(activityId)],
      });
      // 참여자 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.participants(activityId)],
      });
      // 모임 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.activities.list],
      });
    },
    onError: (error: AxiosError) => {
      // 에러 메시지 추출
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "예약 취소에 실패했습니다.";

      // 에러 토스트 표시
      toast.error(errorMessage, {
        description: "잠시 후 다시 시도해주세요.",
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
