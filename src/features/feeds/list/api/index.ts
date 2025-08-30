import { runApi } from "@/client/runClient";
import { FeedListParams, FeedDetailResponse } from "../types";
import { apiRoutes } from "@/constants/route";

const getFeedList = async (params: FeedListParams) => {
  const response = await (
    await runApi.get(apiRoutes.feeds.list, {
      params: {
        ...params,
        size: params.size,
        lastFeedId: params.lastFeedId,
      },
    })
  ).data;
  return response;
};

const getFeedDetail = async (feedId: number): Promise<FeedDetailResponse> => {
  const response = await (
    await runApi.get(apiRoutes.feeds.detail(feedId))
  ).data;
  return response;
};

export { getFeedList, getFeedDetail };
