import { apiRoutes } from '@/constants/route';
import { InfiniteData, keepPreviousData, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { FeedListParams, FeedListResponse } from '../../types';
import { HttpErrorResponse } from '@/client/httpError';
import { getFeedList } from '../../api';

export const useGetFeesListQuery = (
  params: FeedListParams,
  options?: UseInfiniteQueryOptions<FeedListResponse, HttpErrorResponse, InfiniteData<FeedListResponse>>
) => {
  return useInfiniteQuery({
    queryKey: [apiRoutes.feeds.list],
    queryFn: ({ pageParam = 0 }) =>
      getFeedList({
        ...params,
        lastFeedId: typeof pageParam === 'number' ? pageParam : 0,
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
