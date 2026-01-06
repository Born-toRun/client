import { apiRoutes } from "@/constants/route";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getMarathonList,
  addBookmark,
  removeBookmark,
} from "@/apis/marathon";
import {
  MarathonListParams,
  MarathonListResponse,
} from "@/apis/marathon/types";

/**
 * 마라톤 목록 조회 쿼리 훅
 * 백엔드는 페이지네이션을 지원하지 않으므로 전체 목록을 조회하고 프론트엔드에서 필터링
 */
export const useGetMarathonListQuery = (
  params: MarathonListParams,
  options?: UseQueryOptions<MarathonListResponse, AxiosError>
) => {
  const { region, course } = params;

  return useQuery({
    queryKey: [apiRoutes.marathons.list, region, course],
    queryFn: () => getMarathonList(params),
    placeholderData: keepPreviousData,
    ...options,
  });
};

/**
 * 마라톤 북마크 토글 뮤테이션 훅
 * 낙관적 업데이트를 지원하는 북마크 토글 훅
 */
export const useToggleBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      marathonId,
      isBookmarking,
    }: {
      marathonId: number;
      isBookmarking: boolean;
    }) => {
      if (isBookmarking) {
        return removeBookmark(marathonId);
      } else {
        return addBookmark(marathonId);
      }
    },
    onMutate: async ({ marathonId, isBookmarking }) => {
      // 낙관적 업데이트: 즉시 UI 업데이트
      await queryClient.cancelQueries({
        queryKey: [apiRoutes.marathons.list],
      });

      const previousData = queryClient.getQueriesData({
        queryKey: [apiRoutes.marathons.list],
      });

      // 모든 마라톤 목록 쿼리를 업데이트
      queryClient.setQueriesData<MarathonListResponse>(
        { queryKey: [apiRoutes.marathons.list] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            details: old.details.map((marathon) =>
              marathon.id === marathonId
                ? { ...marathon, isBookmarking: !isBookmarking }
                : marathon
            ),
          };
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 데이터로 복구
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // 성공/실패와 관계없이 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.marathons.list],
      });
    },
  });
};
