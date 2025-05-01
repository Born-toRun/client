import { runApi } from '@/client/runClient';
import { FeedListParams } from '../types';
import { apiRoutes } from '@/constants/route';

const getFeedList = async (params: FeedListParams) => {
  // api path 정리
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

export { getFeedList };
