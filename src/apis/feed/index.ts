import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import type {
  UpdateFeedRequest,
  UpdateFeedResponse,
  DeleteFeedResponse,
  MyFeedsResponse,
} from "./types";

/**
 * 피드 수정 API
 * @param feedId 피드 식별자
 * @param data 수정할 피드 데이터
 * @returns 수정된 피드 정보
 */
export const updateFeed = async (
  feedId: number,
  data: UpdateFeedRequest
): Promise<UpdateFeedResponse> => {
  const response = await runApi.put<UpdateFeedResponse>(
    apiRoutes.feeds.update(feedId),
    data
  );
  return response.data;
};

/**
 * 피드 삭제 API
 * @param feedId 삭제할 피드 식별자
 * @returns 삭제 결과
 */
export const deleteFeed = async (
  feedId: number
): Promise<DeleteFeedResponse> => {
  const response = await runApi.delete<DeleteFeedResponse>(
    apiRoutes.feeds.delete(feedId)
  );
  return response.data;
};

/**
 * 내 피드 목록 조회 API
 * @returns 내가 작성한 피드 목록
 */
export const getMyFeeds = async (): Promise<MyFeedsResponse> => {
  const response = await runApi.get<MyFeedsResponse>(apiRoutes.feeds.my);
  return response.data;
};
