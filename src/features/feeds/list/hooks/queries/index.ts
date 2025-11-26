import { apiRoutes } from "@/constants/route";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getFeedList } from "../../api";
import { FeedListParams, FeedListResponse } from "../../types";

export const useGetFeesListQuery = (
  params: FeedListParams,
  options?: Omit<
    UseInfiniteQueryOptions<
      FeedListResponse,
      AxiosError,
      InfiniteData<FeedListResponse>,
      FeedListResponse,
      readonly unknown[],
      number | undefined
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  const category = params.category;
  const isMyCrew = params.isMyCrew;
  const keyword = params.searchKeyword;

  return useInfiniteQuery<
    FeedListResponse,
    AxiosError,
    InfiniteData<FeedListResponse>,
    readonly unknown[],
    number | undefined
  >({
    // Remove lastFeedId from queryKey - it changes per page and shouldn't invalidate cache
    queryKey: [apiRoutes.feeds.list, category, isMyCrew, keyword],
    queryFn: async ({ pageParam }) => {
      const result = await getFeedList({
        ...params,
        size: 10, // Default size
        lastFeedId: pageParam, // Will be undefined for first page, number for subsequent pages
      });
      return result;
    },
    // First page should not send lastFeedId parameter
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage): number | undefined => {
      // If this is the last page, return undefined to stop pagination
      if (lastPage.last || lastPage.content.length === 0) {
        return undefined;
      }
      // Return the ID of the last feed item for cursor-based pagination
      const lastFeedIndex = lastPage.content.length - 1;
      const nextPageParam = lastPage.content[lastFeedIndex].id;
      return nextPageParam;
    },
    ...options,
  });
};
