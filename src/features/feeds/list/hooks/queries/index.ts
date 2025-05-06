import { apiRoutes } from "@/constants/route";
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { FeedListParams, FeedListResponse } from "../../types";
import { HttpErrorResponse } from "@/client/httpError";
import { getFeedList } from "../../api";

export const useGetFeesListQuery = (
  params: FeedListParams,
  options?: UseInfiniteQueryOptions<
    FeedListResponse,
    HttpErrorResponse,
    InfiniteData<FeedListResponse>
  >
) => {
  const category = params.category;
  const lastId = params.lastFeedId;
  const isMayCrew = params.isMyCrew;
  const keyword = params.searchKeyword;
  return useInfiniteQuery({
    queryKey: [apiRoutes.feeds.list, category, lastId, isMayCrew, keyword],
    queryFn: ({ pageParam = 0 }) =>
      getFeedList({
        ...params,
        // size는 default로 10
        size: 10,
        lastFeedId: typeof pageParam === "number" ? pageParam : 0,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastBoardIndex = lastPage.content.length - 1;
      if (lastPage.content.length > 0 && !lastPage.last) {
        return lastPage.content[lastBoardIndex].id;
      }
      return;
    },
    placeholderData: keepPreviousData,
    ...options,
  });
};
