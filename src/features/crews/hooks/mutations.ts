import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCrew } from "../api";
import { apiRoutes } from "@/constants/route";
import type { CrewUpdateRequest } from "../types";

/**
 * 크루 수정 뮤테이션 훅
 * 크루 정보를 수정하고 관련 캐시를 무효화합니다.
 */
export const useUpdateCrewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crewId,
      data,
    }: {
      crewId: number;
      data: CrewUpdateRequest;
    }) => updateCrew(crewId, data),
    onSuccess: (_, { crewId }) => {
      // 크루 상세 정보 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.crews.detail(crewId)],
      });
      // 크루 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.crews.list],
      });
      // 내 크루 정보도 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.crews.my],
      });
    },
  });
};
