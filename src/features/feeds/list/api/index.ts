import { runApi } from "@/client/runClient";
import { FeedListParams, FeedListResponse, FeedDetailResponse } from "../types";
import { apiRoutes } from "@/constants/route";

/**
 * 피드 목록 조회 API
 * Cursor-based pagination using lastFeedId
 * @param params - Query parameters including category, searchKeyword, isMyCrew, size, lastFeedId
 * @returns Paginated feed list response
 */
const getFeedList = async (params: FeedListParams): Promise<FeedListResponse> => {
  const { data } = await runApi.get<FeedListResponse>(
    apiRoutes.feeds.list,
    { params }
  );
  return data;
};

/**
 * 피드 상세 조회 API
 * @param feedId - Feed identifier
 * @returns Feed detail information
 */
const getFeedDetail = async (feedId: number): Promise<FeedDetailResponse> => {
  const { data } = await runApi.get<FeedDetailResponse>(
    apiRoutes.feeds.detail(feedId)
  );
  return data;
};

export { getFeedList, getFeedDetail };
